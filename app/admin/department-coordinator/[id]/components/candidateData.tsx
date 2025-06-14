import React, { useState, useEffect } from "react";
import { useAlocateInterviewees } from "@/hooks/user/useAlocateInterviweers";
import { Company } from "@/Type";
import toast from "react-hot-toast";
import { getDepartmentCordinatorByID } from "@/service/getDepartmentCordinatorById";
import { getPanelistByCompanyIdAndPanelNumber } from "@/service/getPanelistByCompanyIdAndPanelNumber";

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
  const { Allocation, isPending } = useAlocateInterviewees();

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

    setRowData(newRowData);
  }, [candidate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;

    const prefernce = id[7];

    setRowData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    const panels = [
      { panel: "panel1", company: "company1", time: "time1" },
      { panel: "panel2", company: "company2", time: "time2" },
      { panel: "panel3", company: "company3", time: "time3" },
      { panel: "panel4", company: "company4", time: "time4" },
    ];

    const allocationDataArray = [];

    for (const panelInfo of panels) {
      const panelValue = rowData[panelInfo.panel as keyof RowData];
      const companyValue = rowData[panelInfo.company as keyof RowData];
      const timeValue = rowData[panelInfo.time as keyof RowData];

      if (!companyValue) continue;

      let panelistId: string | undefined;

      try {
        const panelistData = await getPanelistByCompanyIdAndPanelNumber(
          companyValue,
          1
        );
        panelistId = panelistData?.data?.[0]?.panelist_id;
      } catch (error) {
        toast.error("Error fetching panelist data - panelist not assigned");
        console.error("Error fetching panelist data:", error);
      }

      const formData = {
        allocated_panel_number: 1,
        company_id: companyValue,
        allocation_timeSlot: "00:00",
        allocation_date: "2024-9-12",
        allocation_status: panelInfo.company[7],
        candidate_id: candidate.candidate_id,
        panelist_id: panelistId,
      };

      allocationDataArray.push(formData);
    }

    Allocation(
      { Allocation: allocationDataArray },
      {
        onSuccess: () => {
          toggleEdit();
          toast.success("Allocation Success");
        },
        onError: (error) => {
          console.error("Allocation error:", error);
          toast.error("Allocation failed");
        },
      }
    );
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="p-2 border-l border-gray-300">{candidate.candidate_id}</td>
      <td className="p-2 border-l border-gray-300">
        {candidate.firstName} {candidate.lastName}
      </td>
      <td className="p-2 border-l border-gray-300">
        {candidate.preference1}
        {" , "}
        {candidate.preference2}
        {" , "}
        {candidate.preference3}
        {" , "}
        {candidate.preference4}
        {" , "}
      </td>
      {/* <td className="p-2 border-l border-gray-300">
        <select
          id="panel1"
          value={rowData.panel1}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">Select Panel</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </td> */}
      <td className="p-2 border-l border-gray-300">
        <select
          id="company1"
          value={rowData.company1}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">None</option>
          {candidate.company
            .slice()
            .sort((a: Company, b: Company) =>
              a.company_name.localeCompare(b.company_name)
            )
            .map((company: Company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
              </option>
            ))}
        </select>
      </td>
      {/* <td className="p-2 border-l border-gray-300">
        <input
          id="time1"
          type="time"
          value={rowData.time1}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300"></td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel2"
          value={rowData.panel2}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">Select Panel</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </td> */}
      <td className="p-2 border-l border-gray-300">
        <select
          id="company2"
          value={rowData.company2}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">None</option>
          {candidate.company
            .slice()
            .sort((a: Company, b: Company) =>
              a.company_name.localeCompare(b.company_name)
            )
            .map((company: Company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
              </option>
            ))}
        </select>
      </td>
      {/* <td className="p-2 border-l border-gray-300">
        <input
          id="time2"
          type="time"
          value={rowData.time2}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300"></td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel3"
          value={rowData.panel3}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">Select Panel</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </td> */}
      <td className="p-2 border-l border-gray-300">
        <select
          id="company3"
          value={rowData.company3}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">None</option>
          {candidate.company
            .slice()
            .sort((a: Company, b: Company) =>
              a.company_name.localeCompare(b.company_name)
            )
            .map((company: Company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
              </option>
            ))}
        </select>
      </td>
      {/* <td className="p-2 border-l border-gray-300">
        <input
          id="time3"
          type="time"
          value={rowData.time3}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300"></td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel4"
          value={rowData.panel4}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">Select Panel</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </td> */}
      <td className="p-2 border-l border-gray-300">
        <select
          id="company4"
          value={rowData.company4}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">None</option>
          {candidate.company
            .slice()
            .sort((a: Company, b: Company) =>
              a.company_name.localeCompare(b.company_name)
            )
            .map((company: Company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
              </option>
            ))}
        </select>
      </td>
      {/* <td className="p-2 border-l border-gray-300">
        <input
          id="time4"
          type="time"
          value={rowData.time4}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300"></td>
      <td className="p-2 border-l border-gray-300"></td>
      <td className="p-2 border-l border-gray-300"></td> */}

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
            className="px-4 py-2  text-blue-500 rounded shadow hover:bg-blue-500 border-2 border-blue-500 hover:text-white"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
};

export default CandidateData;
