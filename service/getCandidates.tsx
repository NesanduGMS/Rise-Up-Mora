import axios from "axios";
import toast from "react-hot-toast";

export const getCandidates = async () => {
  try {
    // const response = await axios.get(
    //   `${process.env.APP_URL}/api/v1/candidate/getCandidates`
    // );
    const response = await fetch(
      `${process.env.APP_URL}/api/v1/candidate/getCandidates`,
      {
        next: { revalidate: 1800 },
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    toast.error("Failed to get candidates");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
