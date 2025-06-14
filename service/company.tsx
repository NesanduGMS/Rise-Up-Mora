"use server";

import axios from "axios";

type CompanyType = {
  companyName: string;
  companyId: string;
  companyIcone: string;
};

export const getAllCompany = async () => {
  try {
    const response = await axios.get(
      `${process.env.APP_URL}/api/v1/company/getAllCompany`
    );

    if (response.data) {
      return response.data;
    }
    // toast.error("getting company failed");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addCompany = async (data: CompanyType) => {
  // console.log(process.env.NEXT_PUBLIC_APP_URL);

  try {
    const response = await axios.post(
      `${process.env.APP_URL}/api/v1/company/addCompany`,
      data
    );

    if (response.data) {
      return response.data;
    }
    // toast.error("adding company failed");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addFeedback = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.APP_URL}/api/v1/feedback/addFeedback`,
      data
    );

    if (response.data) {
      // console.log(response.data);
      return response.data;
    }
    // toast.error("adding feedback failed");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
