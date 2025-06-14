import React, { useState, useEffect } from "react";
import { useAlocateInterviewees } from "@/hooks/user/useAlocateInterviweers";
import { Company } from "@/Type";
import toast from "react-hot-toast";
import { useUpdateInterviewees } from "@/hooks/user/useUpdateInterviewees";
import { getPanelistByCompanyIdAndPanelNumber } from "@/service/getPanelistByCompanyIdAndPanelNumber";
import { getCandidateAllocationDetails } from "@/service/getCandidateAllocationDetails";

// Define an interface for row data
interface RowData {
  panel1: string;
  company1: string;
  time1: string;
  panel2: string;
  company2: string;
  time2: string;
  panel3: string;
  company3: string;
  time3: string;
  panel4: string;
  company4: string;
  time4: string;
}

const CandidateData = (candidate: any) => {
  const { Allocation, isPending } = useUpdateInterviewees();
  // console.log(candidate.allPanelists);
  // console.log(candidate.allocations);
  // console.log(candidate.allocation);
  // console.log(candidate.candidate_id);
  const [isModalOpen, setModalOpen] = useState(false);
  const [conflictDetails, setConflictDetails] = useState<{
    company: string;
    time: string;
  } | null>(null);

  // Initialize state with the RowData interface
  const [rowData, setRowData] = useState<RowData>({
    panel1: "",
    company1: "",
    time1: "",
    panel2: "",
    company2: "",
    time2: "",
    panel3: "",
    company3: "",
    time3: "",
    panel4: "",
    company4: "",
    time4: "",
  });
  const length = candidate.allPanelists.length;
  // console.log("length", length);
  // Initialize edit state
  const [isEditing, setIsEditing] = useState(false);

  // Effect to map allocations to rowData based on candidate.candidate_id
  useEffect(() => {
    const newRowData: RowData = {
      panel1: "",
      company1: "",
      time1: "",
      panel2: "",
      company2: "",
      time2: "",
      panel3: "",
      company3: "",
      time3: "",
      panel4: "",
      company4: "",
      time4: "",
    };

    let panelIndex = 1;

    candidate.allocations.forEach((allocation: any) => {
      if (allocation.candidate_id === candidate.candidate_id) {
        const panelKey = `panel${panelIndex}` as keyof RowData;
        const companyKey = `company${panelIndex}` as keyof RowData;
        const timeKey = `time${panelIndex}` as keyof RowData;

        newRowData[panelKey] = allocation.allocated_panel_number.toString();
        newRowData[companyKey] = allocation.company_id;
        newRowData[timeKey] = allocation.allocation_timeSlot;

        panelIndex++;
      }
    });

    // console.log(newRowData);

    setRowData(newRowData);
  }, [candidate]);

  // Handle input changes and update state
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    // console.log("id", id, value);
    setRowData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // console.log("rowData", rowData);

  // Handle submit button click
  const handleSubmit = async () => {
    const panels = [
      { panel: "panel1", company: "company1", time: "time1" },
      { panel: "panel2", company: "company2", time: "time2" },
      { panel: "panel3", company: "company3", time: "time3" },
      { panel: "panel4", company: "company4", time: "time4" },
    ];

    for (const panelInfo of panels) {
      const panelValue = rowData[panelInfo.panel as keyof RowData];
      const companyValue = rowData[panelInfo.company as keyof RowData];
      const timeValue = rowData[panelInfo.time as keyof RowData];

      const allocation = await getCandidateAllocationDetails(
        candidate.candidate_id
      );

      // console.log(companyValue);
      // console.log(allocation);

      const allocationDetails = allocation.filter(
        (allocation: any) => allocation.company_id != companyValue
      );

      // console.log(all);

      const conflictingAllocation = allocationDetails.find(
        (allocation: any) => {
          const existingTime = allocation.allocation_timeSlot;
          const timeDifference = Math.abs(
            new Date(`1970-01-01T${existingTime}`).getTime() -
              new Date(`1970-01-01T${timeValue}`).getTime()
          );
          return timeDifference <= 14 * 60 * 1000; // 14 minutes in milliseconds
        }
      );
      // console.log(conflictingAllocation);

      if (conflictingAllocation) {
        const userConfirmed = window.confirm(
          `This user has already been allocated to ${conflictingAllocation.company.company_name} at ${conflictingAllocation.allocation_timeSlot}. Do you want to override this allocation?`
        );

        if (!userConfirmed) {
          // console.log("usernr  sx Confirmed");
          // If user cancels, stop the allocation process
          return;
        }
      }

      // console.log("userConfirmed");

      // Skip if the company is empty
      if (!companyValue) continue;

      let panelistId: string | undefined;

      try {
        const panelistData = await getPanelistByCompanyIdAndPanelNumber(
          companyValue,
          parseInt(panelValue)
        );
        panelistId = panelistData?.data?.[0]?.panelist_id;
      } catch (error) {
        console.error("Error fetching panelist data:", error);
      }

      const previousAllocation = candidate.allocations.find(
        (allocation: any) => allocation.candidate_id === candidate.candidate_id
      );
      // console.log(previousAllocation);
      // console.log(parseInt(panelValue));
      // console.log(panelValue);

      // if (conflictingAllocation) {
      //   setConflictDetails({
      //     company: conflictingAllocation.company_id,
      //     time: conflictingAllocation.allocation_timeSlot,
      //   });
      //   setModalOpen(true);
      //   return; // Exit loop until user makes a decision
      // }

      const formData = {
        allocated_panel_number: parseInt(panelValue),
        company_id: companyValue,
        allocation_timeSlot: timeValue,
        allocation_date: "2024-9-12",
        allocation_status: previousAllocation.allocation_status,
        candidate_id: candidate.candidate_id,
        panelist_id: panelistId,
      };
      // console.log("formData", formData);

      // console.log(allocationDetails);

      try {
        await Allocation(
          { Allocation: formData },
          {
            onSuccess: () => {
              toast.success("Allocation Success");
              toggleEdit();
            },
            onError: (error) => {
              console.error("Allocation error:", error);
              toast.error("Allocation failed");
            },
          }
        );
      } catch (error) {
        console.error("Error submitting allocation:", error);
        toast.error("Allocation submission error");
      }
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
 
  return (
    <>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        conflictingCompany={""}
        conflictingTime={""}
      /> */}
      <tr className="border-b border-gray-300">
        <td className="p-2 border-l border-gray-300">
          {candidate.candidate_id}
        </td>
        <td className="p-2 border-l border-gray-300">
          {candidate.candidate.contactNo}
        </td>
        <td className="p-2 border-l border-gray-300">
          {candidate.firstName} {candidate.lastName}
        </td>
        <td className="p-2 border-l border-gray-300">
          <select
            id="panel1"
            value={rowData.panel1}
            onChange={handleChange}
            disabled={!isEditing}
            className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
          >
            {candidate.allPanelists.map((panelist: any) => (
              <option key={panelist.panelist_id} value={panelist.pannel_number}>
                {panelist.pannel_number}
              </option>
            ))}
          </select>
        </td>
        <td className="p-2 border-l border-gray-300">
          <input
            id="time1"
            type="time"
            value={rowData.time1}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </td>
        <td className="p-2 border-l border-gray-300">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={toggleEdit}
                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={toggleEdit}
              className="px-4 py-2 text-blue-500 rounded shadow hover:bg-blue-500 border-2 border-blue-500 hover:text-white"
            >
              Edit
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default CandidateData;
