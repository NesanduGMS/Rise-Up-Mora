import toast from "react-hot-toast";

interface Allocation {
  allocation_id: string;
  allocation_date: string;
  allocation_timeSlot: string;
  attendance: boolean;
  company: {
    company_name: string;
  };
  panelist: {
    pannel_number: number;
  };
  candidate: {
    firstName: string;
    lastName: string;
    degree: string;
    candidate_id: string;
  };
}


export const getAllocationDetails = async (
  panelistId: string
): Promise<Allocation[] | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/candidate/getAllocations?panelistId=${panelistId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    
    if (!response.ok) {
      let errorMessage = "Error fetching allocation details";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        errorMessage = `Server returned status code ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data as Allocation[]; 

    } else {
      throw new Error("Received non-JSON response from the server");
    }
  } catch (error: any) {
    console.error("Error fetching allocation details:", error);
    toast.error(error.message || "Error fetching allocation details");
    return null;
  }
};
