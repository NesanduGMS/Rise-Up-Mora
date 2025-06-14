import axios from "axios";
import { Allocation } from "@/Type";

export const InterviewAllocation = async (data: {
  Allocation: Allocation[];
}) => {
  const items = data.Allocation;

  try {
    const postResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/admin/AllInterviewees`,
      items
    );

    if (!postResponse.data) {
      console.log(postResponse.data);
      throw new Error("Allocation failed");
    }
  } catch (error) {
    console.log(error);
    console.error("Error in InterviewAllocation:", error);
    throw error;
  }
};
