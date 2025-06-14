import React from "react";
import { Button } from "./ui/button";
// import { Button } from "./button";

export default function MainBtn({ text }: { text: string }) {
  return (
    <div className="relative flex  font-poppins   px-3  ">
      <Button className="ml-2 text-3xl" variant="secondary" size="default">
        {text}
      </Button>
      <div className="absolute text-3xl mt-2 mr-4 sm:mt-2 sm:mr-3 bg-[#f1c232] text-[#f1c232] rounded-[10px] border-none  px-7 py-2.5  cursor-pointer  ">
        {text}
      </div>
    </div>
  );
}
