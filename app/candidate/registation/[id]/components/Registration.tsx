"use client";
import React from "react";
import Alert from "./Alert";
import Form from "./Form";
import { Candidate } from "@/Type";

type RegistrationProps = {
  candidate?: Candidate | null;
};

const Registration = ({ candidate }: RegistrationProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:w-3/4 xl:w-2/3 justify-center items-center">
        <Alert />
        <Form candidate={candidate} />
      </div>
    </div>
  );
};

export default Registration;
