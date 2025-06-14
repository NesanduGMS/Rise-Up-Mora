import { Panelist } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const getPanelistByCompanyIdAndPanelNumber = async (
  company_id: string,
  pannel_number: number
) => {
  try {
    const response = await axios.get(
      // `https://riseupmora.lk/api/v1/admin/getPanelistByCompanyIdAndPanelNumber`
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/admin/getPanelistByCompanyIdAndPanelNumber`,
      {
        params: { company_id, pannel_number },
      }
    );

    if (response.data) {
      return response.data;
    }
    toast.error("Failed to get Panels");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
