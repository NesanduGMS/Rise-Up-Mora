import axios from "axios";
import toast from "react-hot-toast";

export const getFeedback = async () => {
  try {
    const response = await axios.get(
      `${process.env.APP_URL}/api/v1/company/getfeedback`
    );
    if (response.data) {
      return response.data;
    }
    toast.error("Failed to get feedback");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
