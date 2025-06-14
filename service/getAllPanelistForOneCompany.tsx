import { Panelist } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const getAllPanelistForOneCompany = async (company_id: string) => {
  try {
    const response = await axios.get(
      `${process.env.APP_URL}/api/v1/admin/getPanelistForOneCompany`,
      {
        params: { company_id },
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
