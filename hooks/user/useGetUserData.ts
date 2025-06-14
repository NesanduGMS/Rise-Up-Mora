import { getUser } from "@/service/getUser";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
// import { getMe } from "../services/candidateApi";

export const useGetUserData = ({ userEmail }: { userEmail: string }) => {
  // const session = useSession();

  // const userId = session.data?.user?.token?.sub as string;

  const { data: user, isPending } = useQuery({
    queryKey: ["user", userEmail],
    queryFn: () => getUser({ userEmail }),
    // queryFn: () => getCandidate(userId),
  });

  // const { data: candidate, isPending } = useQuery({
  //   queryKey: ["candidate", userId],
  //   queryFn: () => getCandidate(userId),
  // });

  return { user, isPending };
};
