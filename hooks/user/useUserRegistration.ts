

import { useMutation } from "@tanstack/react-query";
import { userRegistration } from "@/service/userRegistration";
import { RegistrationFormDataSendType, RegistrationFormDataType } from "@/Type";
import toast from "react-hot-toast";

type RegistrationHookType = {
  registrationData: RegistrationFormDataSendType;
};

export const useUserRegistration = () => {
  const { mutate: Registration, isPending } = useMutation({
    mutationFn: ({ registrationData }: RegistrationHookType) =>
      userRegistration(registrationData),
    onSuccess: () => {
      // toast.success("Registration Success");
    },
    onError: (error) => {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    },
  });

  return { Registration, isPending };
};
