"use server";
import { RegistrationFormDataSendType, RegistrationFormDataType } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const getCandidate = async ({ userId }: { userId: string }) => {
  // export const getCandidate = async (data: string) => {
  // const data = "clyld3pa40000wb6y5trem706";

  // if (!userId) return;

  try {
    const response = await axios.get(
      `${process.env.APP_URL}/api/v1/user/getCandidate/${userId}`
    );
    if (response.data) {
      return response.data;
    }
    toast.error("Registration failed");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
