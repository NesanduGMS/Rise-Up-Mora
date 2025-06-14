import React from "react";
import { useMutation } from "@tanstack/react-query";
import { InterviewAllocation } from "@/service/InterviewAllocation";
import toast from "react-hot-toast";

export const useAlocateInterviewees = () => {
  const { mutate: Allocation, isPending } = useMutation({
    mutationFn: async (allocationData: any) => {
      // Log the allocation data to inspect its structure

      // Call the InterviewAllocation function with the data
      try {
        const response = await InterviewAllocation(allocationData);
        return response;
      } catch (error) {
        console.error("InterviewAllocation error:", error);
        throw error; // Re-throw the error to let react-query handle it
      }
    },

    onSuccess: () => {
      toast.success("Allocation Success");
    },
    onError: (error) => {
      console.error("Allocation error:", error);
      toast.error("Allocation failed");
    },
  });

  return { Allocation, isPending };
};
