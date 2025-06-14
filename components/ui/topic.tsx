import React from "react";
import { Button } from "./topicbutton";

export default function Topic({ text }: { text: string }) {
  return (
    <div className="relative flex justify-center items-center font-poppins px-3">
      <Button variant="secondary" size="xl">
        {text}
      </Button>
      <div className="absolute mt-2 mr-2 sm:mt-4  sm:mr-6 bg-[#f1c232] text-[#f1c232] rounded-[10px] border-none px-14 py-2 cursor-pointer text-[25px]">
        {text}
      </div>
    </div>
  );
}
