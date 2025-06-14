import { Panelist } from "@/Type";
import axios from "axios";
// import toast from "react-hot-toast";

export const getDepartmentCordinatorByID = async (cordinator_id: any) => {
  // console.log(cordinator_id);
  // console.log(process.env.NEXT_PUBLIC_APP_URL);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/admin/getDepartmentCordinatorById`,
      {
        params: { cordinator_id },
      }
    );

    if (response.data) {
      return response.data;
    }
    // toast.error("Failed to get Panels");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
