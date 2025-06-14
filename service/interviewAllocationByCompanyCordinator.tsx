import axios from "axios";
import { Allocation } from "@/Type";

export const InterviewAllocationByCompanyCordinator = async (data: {
  Allocation: Allocation;
}) => {
  const item = data.Allocation; // Access the Allocation object
  // console.log(process.env.NEXT_PUBLIC_APP_URL);
  try {
    const putResponse = await axios.put(
      // `https://riseupmora.lk/api/v1/admin/UpdateInterviewByCompanyCordinator`
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/admin/UpdateInterviewByCompanyCordinator`,
      {
        allocation_date: item.allocation_date,
        allocation_timeSlot: item.allocation_timeSlot,
        allocated_panel_number: item.allocated_panel_number,
        attendance: false,
        allocation_status: item.allocation_status,
        candidate_id: item.candidate_id,
        company_id: item.company_id,
        panelist_id: item.panelist_id,
      }
    );

    if (!putResponse.data) {
      throw new Error("Update failed");
    }
  } catch (error) {
    console.log(error);
    console.error("Error in InterviewAllocation:", error);
    throw error; // Ensure the error is thrown so it can be caught in useMutation
  }
};
