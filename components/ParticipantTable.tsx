"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PageLoader from "./PageLoader";
import { getAllocationDetails } from "@/service/getAllocationDetails";

type Participant = {
  name: string;
  degree: string;
  allocatedTime: string;
  allocatedTime24: string; 
  attended: boolean;
  candidateId: string;
  allocationId: string;
};
type Candidate = {
  firstName: string;
  lastName: string;
  degree: string;
  candidate_id: string;
};

type Allocation = {
  allocation_id: string;
  allocation_timeSlot: string;
  attendance: boolean;
  candidate: Candidate;
};

type ParticipantTableProps = {
  panelistId: string;
};

const ParticipantTable: React.FC<ParticipantTableProps> = ({ panelistId }) => {
  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [attendanceState, setAttendanceState] = useState<{
    [key: string]: boolean;
  }>({});
  const [updatingState, setUpdatingState] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const participants: Allocation[] | null = await getAllocationDetails(
          panelistId
        );

        if (participants) {
          const transformedParticipants = participants
            .filter((item) => item.allocation_timeSlot !== "00:00")
            .map((item: any) => {
              // Convert to 24-hour format (HH:mm) for sorting
              const allocatedTime24 = item.allocation_timeSlot;

              // Convert to 12-hour AM/PM format for display
              const timeSlot = new Date(
                `1970-01-01T${item.allocation_timeSlot}:00`
              );
              const formattedTime = timeSlot.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });

              return {
                name: `${item.candidate.firstName} ${item.candidate.lastName}`,
                degree: item.candidate.degree,
                allocatedTime: formattedTime, 
                allocatedTime24, 
                attended: item.attendance,
                candidateId: item.candidate.candidate_id,
                allocationId: item.allocation_id,
              };
            });

          // Sort the data by 24-hour time (HH:mm)
          transformedParticipants.sort((a, b) =>
            a.allocatedTime24.localeCompare(b.allocatedTime24)
          );

          setData(transformedParticipants);

          const initialAttendanceState: { [key: string]: boolean } = {};
          const initialUpdatingState: { [key: string]: boolean } = {};
          transformedParticipants.forEach((participant) => {
            initialAttendanceState[participant.candidateId] =
              participant.attended;
            initialUpdatingState[participant.candidateId] = false;
          });
          setAttendanceState(initialAttendanceState);
          setUpdatingState(initialUpdatingState);
        } else {
          console.error("Participants data is null.");
        }
      } catch (error) {
        console.error("Failed to fetch participants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [panelistId]);

  const handleCheckboxChange = async (
    candidateId: string,
    attended: boolean
  ) => {
    const updatedParticipant = data.find(
      (participant) => participant.candidateId === candidateId
    );
    if (!updatedParticipant) return;

    setUpdatingState((prev) => ({
      ...prev,
      [candidateId]: true,
    }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/candidate/updateAttendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            allocationId: updatedParticipant.allocationId,
            attended,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to update participant attendance";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          errorMessage = `Server returned status code ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      setAttendanceState((prev) => ({
        ...prev,
        [candidateId]: attended,
      }));

      setData((prevData) =>
        prevData.map((participant) =>
          participant.candidateId === candidateId
            ? { ...participant, attended }
            : participant
        )
      );
    } catch (error) {
      console.error("Failed to update participant attendance:", error);
    } finally {
      setUpdatingState((prev) => ({
        ...prev,
        [candidateId]: false,
      }));
    }
  };

  const columns: ColumnDef<Participant, any>[] = [
    {
      header: "Name",
      cell: ({ row }) => {
        return (
          <Link
            href={`/candidate/candidate-dashboard/${row.original.candidateId}-${panelistId}`}
            className="text-blue-500 hover:underline"
          >
            {row.original.name}
          </Link>
        );
      },
    },
    {
      header: "Degree",
      accessorKey: "degree",
    },
    {
      header: "Allocated Time",
      accessorKey: "allocatedTime", // Display time in 12-hour format
      cell: ({ getValue }) => getValue<string>(),
    },
    {
      header: "Attended",
      cell: ({ row }) => {
        const isChecked = attendanceState[row.original.candidateId] || false;
        const isUpdating = updatingState[row.original.candidateId] || false;

        return (
          <div className="flex items-center">
            <Checkbox
              checked={isChecked}
              onCheckedChange={() =>
                handleCheckboxChange(row.original.candidateId, !isChecked)
              }
              disabled={isUpdating}
            />
            <span className="ml-2 text-gray-500"></span>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <Table className="w-full">
          <TableHeader className="bg-stv-dark-blue text-stv-yellow">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.getCanSort() ? "cursor-pointer" : ""
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <div className="flex items-center justify-between py-2">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ParticipantTable;
