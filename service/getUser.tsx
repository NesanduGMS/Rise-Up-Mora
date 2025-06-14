"use server";

import axios from "axios";
import toast from "react-hot-toast";

export const getUser = async ({ userEmail }: { userEmail: string }) => {
  // export const getCandidate = async (data: string) => {
  // const data = "clyld3pa40000wb6y5trem706";

  // if (!userId) return;

  try {
    const response = await axios.get(
      `${process.env.APP_URL}/api/v1/user/getUserByEmail/${userEmail}`
    );
    if (response.data) {
      return response.data;
    }
    toast.error("get user failed");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
