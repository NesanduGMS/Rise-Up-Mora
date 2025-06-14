"use client";

import React, { useEffect, useState } from "react";
import { Candidate } from "@/Type";

interface Props {
  initialCandidates: Candidate[];
}

const RegisterCandidate: React.FC<Props> = ({ initialCandidates }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [filteredCandidates, setFilteredCandidates] =
    useState<Candidate[]>(initialCandidates);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [searchIndex, setSearchIndex] = useState<string>("");

  useEffect(() => {
    let filtered = candidates;

    if (selectedDepartment === "sort-by" || selectedDepartment === "") {
      filtered = candidates;
    } else {
      filtered = candidates.filter(
        (candidate) => candidate.department === selectedDepartment
      );
    }

    if (searchIndex) {
      filtered = filtered.filter((candidate) =>
        candidate.universityID.toLowerCase().includes(searchIndex.toLowerCase())
      );
    }
    setFilteredCandidates(filtered);
  }, [candidates, selectedDepartment, searchIndex]);

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSearchIndexChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchIndex(event.target.value);
  };

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row justify-end gap-4 mb-5">
        <div className="input-group w-full md:max-w-md mb-3 flex">
          <input
            className="form-input w-full p-2 border border-gray-300 rounded-l-md text-sm md:text-base"
            type="search"
            placeholder="Search By Index"
            value={searchIndex}
            onChange={handleSearchIndexChange}
          />
          <button className="btn btn-success p-2 bg-green-500 text-white rounded-r-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className="bg-white shadow-md p-4 rounded-lg"
        style={{ margin: "0 2%" }}
      >
        <div className="text-blue-500 mb-4 border-b pb-2 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-blue-500 mb-4  pb-2 flex flex-col md:flex-row justify-between items-start md:items-center">
            <span className="text-lg mb-2 md:mb-0">
              Number of candidates - {filteredCandidates.length}
            </span>
          </div>
          <select
            className="form-select text-blue-500 p-1 md:p-2 border border-gray-300 rounded-md text-sm md:text-base w-full md:w-auto"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="sort-by">Sort By Department</option>
<option value="Electronic_and_Telecommunication_Engineering">
  Electronic and Telecommunication Engineering
</option>
<option value="Electrical_Engineering">Electrical Engineering</option>
<option value="Mechanical_Engineering">Mechanical Engineering</option>
<option value="Civil_Engineering">Civil Engineering</option>
<option value="Material_Science_and_Engineering">
  Material Science and Engineering
</option>
<option value="Chemical_and_Process_Engineering">
  Chemical and Process Engineering
</option>
<option value="Transport_Management_and_Logistics_Engineering">
  Transport Management and Logistics Engineering
</option>
<option value="Textile_and_Apparel_Engineering">
  Textile and Apparel Engineering
</option>
<option value="Earth_Resources_Engineering">
  Earth Resources Engineering
</option>
<option value="Computer_Science_and_Engineering">
  Computer Science and Engineering
</option>
<option value="Information_Technology">Information Technology</option>
<option value="Interdisciplinary_Studies">Interdisciplinary Studies</option>
<option value="Computational_Mathematics">Computational Mathematics</option>

          </select>
        </div>

        {filteredCandidates.length === 0 && selectedDepartment && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm md:text-base">
            No data found.
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-gray-700 text-sm md:text-base">
            <thead>
              <tr className="text-sm border-b">
                <th className="p-2">Index</th>
                <th className="p-2">Name</th>
                <th className="p-2">Department</th>
                <th className="p-2">Email</th>
                <th className="p-2">Contact No</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.candidate_id} className="border-b">
                  <td className="p-2">{candidate.universityID}</td>
                  <td className="p-2">{candidate.nameWithInitials}</td>
                  <td className="p-2">{candidate.department}</td>
                  <td className="p-2">{candidate.user.email}</td>
                  <td className="p-2">{candidate.contactNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegisterCandidate;
