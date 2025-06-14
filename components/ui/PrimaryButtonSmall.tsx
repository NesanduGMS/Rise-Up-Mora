import React from "react";
import { Button } from "./button";

export default function PrimaryButtonSmall({ text }: { text: string }) {
  return (
    <div className="relative flex justify-center items-center font-poppins   px-3  ">
      <Button variant="secondary" size="default">
        {text}
      </Button>
      <div className="absolute mt-2 mr-2 sm:mt-3 sm:mr-3 bg-[#f1c232] text-[#f1c232] rounded-[10px] border-none  px-7 py-2.5  cursor-pointer  ">
        {text}
      </div>
    </div>
  );
}
