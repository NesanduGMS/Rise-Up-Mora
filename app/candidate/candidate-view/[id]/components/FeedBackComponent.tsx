import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Rating } from "@/components/Rating";

export default function FeedBackComponent({
  company,
  communication,
  experience,
  problemSolving,
  technical,
  feedback,
}: {
  company: string;
  communication: number;
  experience: number;
  problemSolving: number;
  technical: number;
  feedback: string;
}) {
  // console.log(
  //   company,
  //   communication,
  //   experience,
  //   problemSolving,
  //   technical,
  //   feedback
  // );
  return (
    <div className="bg-white rounded-md px-6 py-4 m-3 text-custom-black font-poppins text-sm    ">
      <div className="flex gap-4  ">
        <div className="font-semibold">Company: </div>
        <div className="">{company}</div>
      </div>
      <div className=" grid grid-cols-2">
        <div className="font-semibold">Communication Skills: </div>
        <Rating readOnly={true} value={communication} size={100} />
        {/* <div className="md:w-48 grid content-center "><ProgressBar  bgColor={'#29A7E1'} height='12px' labelSize={'10px'} animateOnRender={true} completed={communication} /></div> */}

        <div className="font-semibold">Experience and projects : </div>
        <div className="md:w-48 grid content-center ">
          <Rating readOnly={true} value={experience} size={100} />
        </div>

        <div className="font-semibold">problem solving skills : </div>
        <div className="md:w-48 grid content-center ">
          <Rating readOnly={true} value={problemSolving} size={100} />
        </div>

        <div className="font-semibold">Techinical Skills: </div>
        <div className="md:w-48 grid content-center ">
          <Rating readOnly={true} value={technical} size={100} />
        </div>
      </div>

      <div className="flex gap-4 ">
        <div className="font-semibold">Feedback: </div>
        <div className="">{feedback}</div>
      </div>
    </div>
  );
}
