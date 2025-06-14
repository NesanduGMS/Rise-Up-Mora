// import { getCandidate } from "@/service/getCandidate";
import { getAllCompany } from "@/service/company";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
// import { getMe } from "../services/candidateApi";

export const useGetAllCompany = () => {
  // const session = useSession();

  // const userId = session.data?.user?.token?.sub as string;

  const { data: company, isPending } = useQuery({
    queryKey: ["all-company"],
    queryFn: () => getAllCompany(),
    // queryFn: () => getCandidate(userId),
  });

  // const { data: candidate, isPending } = useQuery({
  //   queryKey: ["candidate", userId],
  //   queryFn: () => getCandidate(userId),
  // });

  return { company, isPending };
};
