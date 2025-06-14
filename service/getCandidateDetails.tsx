import axios from "axios";
// import toast from "react-hot-toast";

export const getCandidateDetails = async (panelistId: string) => {
  try {
    // console.log("panelistId", panelistId);
    const response = await axios.post(
      `${process.env.APP_URL}/api/v1/candidate/getCandidateDetails?panelistId=${panelistId}`
    );

    // console.log("response", response.data);

    if (response.data) {
      return response.data;
    } else {
      // toast.error("Failed to get candidate details.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    // toast.error("Error fetching candidate details.");
    return null;
  }
};
