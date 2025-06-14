"use client";
import React, { useState, useEffect } from "react";
import CandidateData from "./candidateData";
import { Allocation, Candidate, Company, Feedback } from "@/Type";
import { getDepartmentCordinatorByID } from "@/service/getDepartmentCordinatorById";

interface Props {
  initialCandidates: Candidate[];
  feedbacks: Feedback[];
  company: Company[];
  allocation: Allocation[];
  departmentCordinatorId: string;
  department: string;
}
const AllIntervieweesData: React.FC<Props> = ({
  department,
  initialCandidates,
  feedbacks,
  company,
  allocation,
  departmentCordinatorId,
}) => {
  interface RowData {
    id: number;
    name: string;
    pref_1: string;
    // Add other properties as needed
  }

  const [rowData, setRowData] = useState<RowData[]>([]);
  const [editBtnId, setEditBtnId] = useState<string | undefined>();
  const [searchField, setSearchField] = useState<string | undefined>("");
  const [selectedDepartment, setSelectedDepartment] = useState<
    string | undefined
  >(""); // New state for sorting
  const [numCandidate, setNumCandidate] = useState<number | undefined>(501); // Set your initial candidate count
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredCandidates, setFilteredCandidates] =
    useState<Candidate[]>(initialCandidates);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredCandidates.length)
      : 0;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const filterCandidates = getDepartmentCordinatorByID(departmentCordinatorId)
    .then((departmentCordinatorData) => {
      console.log(departmentCordinatorData.data.department);
    })
    .catch((error) => {
      console.error("Error fetching department coordinator data:", error);
    });
  useEffect(() => {
    // Filter and sort candidates based on search field and department
    let filtered = initialCandidates;

    if (searchField) {
      const searchTerm = searchField.toLowerCase();
      filtered = filtered.filter((candidate) =>
        candidate.candidate_id.toString().includes(searchTerm)
      );
    }

    // if (selectedDepartment) {
    //   filtered = filtered.filter(
    //     (candidate) => candidate.department === selectedDepartment
    //   );
    // }

    setFilteredCandidates(filtered);
  }, [
    searchField,
    selectedDepartment,
    initialCandidates,
    departmentCordinatorId,
  ]);

  const [AllCandidateData, setAllCandidateData] =
    useState<Candidate[]>(initialCandidates);

  function handleEditButton(check: boolean, id: string) {
    if (check) setEditBtnId(id);
    else setEditBtnId("");
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchField(e.target.value);
  }

  function handleSearchClick() {
    // Handle search click logic if needed
  }

  function handleSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDepartment(e.target.value);
  }

  return (
    <div className="px-5 py-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-3">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            className="form-control form-control-sm w-full p-2 border border-gray-300 rounded shadow-sm"
            type="search"
            placeholder="Search By Index"
            aria-label="Search"
            onChange={handleSearch}
          />
          <button
            className="btn btn-sm bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
            type="submit"
            onClick={handleSearchClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          Department: {department}
          {/* <select
            onChange={handleSortBy}
            className="form-select p-2 border border-gray-300 rounded shadow-sm"
            aria-label="Default select example"
          >
            <option value="">Sort By Department</option>
            <option value="Bio Medical Engineering">
              Bio Medical Engineering
            </option>
            <option value="Electronic and Telecommunication Engineering">
              Electronic and Telecommunication Engineering
            </option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Material Science Engineering">
              Material Science Engineering
            </option>
            <option value="Chemical and Process Engineering">
              Chemical and Process Engineering
            </option>
            <option value="Transport Management and Logistics Engineering">
              Transport Management and Logistics Engineering
            </option>
            <option value="Textile and Apparel Engineering">
              Textile and Apparel Engineering
            </option>
            <option value="Earth Resource Engineering">
              Earth Resource Engineering
            </option>
            <option value="Computer Science & Engneering">
              Computer Science & Engineering
            </option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Interdisciplinary Study">
              Interdisciplinary Study
            </option>
            <option value="Computational Mathematics">
              Computational Mathematics
            </option>
          </select> */}
        </div>

        <div className="w-full md:w-auto text-gray-700 font-semibold text-center md:text-right">
          Number of candidates - {filteredCandidates.length}
        </div>
      </div>

      {filteredCandidates.length === 0 ? (
        <div className="w-full p-4 text-center text-red-500 bg-red-100 rounded">
          No data found!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300 text-left">ID</th>
                <th className="p-2 border border-gray-300 text-left">Name</th>
                <th className="p-2 border border-gray-300 text-left">
                  Preferences
                </th>
                {/* <th className="p-2 border border-gray-300 text-left">
                  Pannel List 1
                </th> */}
                <th className="p-2 border border-gray-300 text-left">
                  Allocated Company 1
                </th>
                {/* <th className="p-2 border border-gray-300 text-left">
                  Time Slot 1
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Feedback 1
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Pannel List 2
                </th> */}
                <th className="p-2 border border-gray-300 text-left">
                  Allocated Company 2
                </th>
                {/* <th className="p-2 border border-gray-300 text-left">
                  Time Slot 2
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Feedback 2
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Pannel List 3
                </th> */}
                <th className="p-2 border border-gray-300 text-left">
                  Allocated Company 3
                </th>
                {/* <th className="p-2 border border-gray-300 text-left">
                  Time Slot 3
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Feedback 3
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Pannel List 4
                </th> */}
                <th className="p-2 border border-gray-300 text-left">
                  Allocated Company 4
                </th>
                {/* <th className="p-2 border border-gray-300 text-left">
                  Time Slot 4
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Feedback 4
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Attended
                </th> */}
                {/* <th className="p-2 border border-gray-300 text-left">
                  Allocation status
                </th> */}
                <th className="p-2 border border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((candidate) => (
                  <CandidateData
                    candidate={candidate}
                    feedbacks={feedbacks}
                    company={company}
                    allocation={allocation}
                    handleEditButton={handleEditButton}
                    editBtnId={editBtnId}
                    key={candidate.candidate_id}
                    candidate_id={candidate.candidate_id}
                    firstName={candidate.firstName}
                    lastName={candidate.lastName}
                    preference1={candidate.prefCompany1}
                    preference2={candidate.prefCompany2}
                    preference3={candidate.prefCompany3}
                    preference4={candidate.prefCompany4}
                    allocations={allocation}
                    departmentCordinatorId={departmentCordinatorId}
                  />
                ))}
              {emptyRows > 0 && (
                <tr style={{ height: 43 * emptyRows }}>
                  <td colSpan={19} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center py-3">
        <div className="flex gap-2">
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="form-select p-2 border border-gray-300 rounded shadow-sm"
          >
            <option value={5}>5 rows per page</option>
            <option value={10}>10 rows per page</option>
            <option value={25}>25 rows per page</option>
            <option value={50}>50 rows per page</option>
            <option value={100}>100 rows per page</option>
          </select>
        </div>

        <div className="flex gap-2"></div>

        <div className="flex gap-2">
          <button
            className="btn bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
            onClick={() => handleChangePage(0)}
            disabled={page === 0}
            title="Go to First Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-double-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5.146 3.646a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8 5.646 5.146a.5.5 0 0 0 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M9.146 3.646a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L6.707 8l2.439-2.146a.5.5 0 0 0 0-.708z"
              />
            </svg>
          </button>
          <button
            className="btn bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            title="Go to Previous Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5.146 8.354a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708.708L6.707 8l4.147 4.146a.5.5 0 0 1-.708.708l-5-5z"
              />
            </svg>
          </button>
          <span className="px-4">
            {page + 1} of {Math.ceil(filteredCandidates.length / rowsPerPage)}
          </span>
          <button
            className="btn bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
            onClick={() => handleChangePage(page + 1)}
            disabled={
              page >= Math.ceil(filteredCandidates.length / rowsPerPage) - 1
            }
            title="Go to Next Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10.854 8.354a.5.5 0 0 0 0-.708l-5-5a.5.5 0 0 0-.708.708L9.293 8l-4.147 4.146a.5.5 0 0 0 .708.708l5-5z"
              />
            </svg>
          </button>
          <button
            className="btn bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
            onClick={() =>
              handleChangePage(
                Math.max(
                  0,
                  Math.ceil(filteredCandidates.length / rowsPerPage) - 1
                )
              )
            }
            disabled={
              page >= Math.ceil(filteredCandidates.length / rowsPerPage) - 1
            }
            title="Go to Last Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-double-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10.854 3.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8l-2.439-2.146a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M6.854 3.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L9.293 8 6.354 5.146a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllIntervieweesData;
