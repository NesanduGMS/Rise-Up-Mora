import axios from "axios";
import toast from "react-hot-toast";

export const getCompanyAllocationData = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/companyAllocation/getCompanyAllocation/${id}`
    );
    if (response.data) {
      return response.data;
    }
    toast.error("Failed to get candidates");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
