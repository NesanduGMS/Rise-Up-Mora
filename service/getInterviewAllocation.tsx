import axios from "axios";
import toast from "react-hot-toast";

export const getAllocation = async () => {
  try {
    const response = await axios.get(
      `${process.env.APP_URL}/api/v1/admin/getAllInterviewees`
    );
    if (response.data) {
      return response.data;
    }
    toast.error("Failed to get Allocation");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
