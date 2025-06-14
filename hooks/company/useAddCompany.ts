// hooks/useUploadCV.ts
import { addCompany } from "@/service/company";
import { uploadCandidateCv } from "@/service/uploadCandidateCv";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// import { uploadCVService } from '@/service/uploadCVService';
// import { useSession } from "next-auth/react";
type CompanyType = {
  companyName: string;
  companyId: string;
  companyIcone: string;
};

export const useAddCompany = () => {
  const queryClient = useQueryClient();

  const { mutate: addNewCompany, isPending: isUpdating } = useMutation({
    mutationFn: (data: CompanyType) => addCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-company"],
      });
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["candidate", userId],
    //   });
    // },
  });

  return { addNewCompany, isUpdating };
};
