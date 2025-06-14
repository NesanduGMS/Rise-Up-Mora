import axios from "axios";
import toast from "react-hot-toast";

export const getCompany = async () => {
  try {
    const response = await axios.get(
      `${process.env.APP_URL}/api/v1/company/getAllCompany`
    );
    if (response.data) {
      return response.data;
    }
    toast.error("Failed to get Company");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
