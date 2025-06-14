"use server";

import axios from "axios";
import toast from "react-hot-toast";

export const updateAttendance = async (
  allocationId: string,
  attended: boolean
) => {
  if (!allocationId || typeof attended !== "boolean") {
    toast.error("Invalid data provided");
    return null;
  }

  try {
    const response = await axios.post(
      "/api/v1/candidate/updateAttendance",
      {
        allocationId,
        attended,
      }
    );

    if (response.status === 200) {
      toast.success("Attendance updated successfully");
      return response.data;
    } else {
      toast.error("Failed to update attendance");
      return null;
    }
  } catch (error) {
    console.error("Error updating attendance:", error);
    toast.error("An error occurred while updating attendance");
    return null;
  }
};
