import { getCompanyAllocationData } from "@/service/getCompanyAllocationData";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
// import { getMe } from "../services/candidateApi";

export const useCompanyAllocation = ({ userId }: { userId: string }) => {
  // const session = useSession();

  // const userId = session.data?.user?.token?.sub as string;

  const { data: CompanyAllocation, isPending } = useQuery({
    queryKey: ["CompanyAllocation", userId],
    queryFn: () => getCompanyAllocationData(userId),
    // queryFn: () => getCandidate(userId),
  });

  // const { data: candidate, isPending } = useQuery({
  //   queryKey: ["candidate", userId],
  //   queryFn: () => getCandidate(userId),
  // });

  return { CompanyAllocation, isPending };
};
