// "use client"
import StudentFooter from "@/components/StudentFooter";
import StudentNavbar from "@/components/StudentNavbar";
import PrimaryButtonSmall from "@/components/ui/PrimaryButtonSmall";
import { Candidate } from "@/Type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Feedback from "./Feedback";
import StudentNavbarForStuDashboard from "@/components/StudentNavbarForStuDashboard";

const Dashboard = ({ data, panelId }: { data: Candidate; panelId: string }) => {
  return (
    <div className="w-full  block 2xl:flex 2xl:justify-center 2xl:items-center px-5 md:px-12 lg:px-28 2xl:px-56 h-100 mb-10">
      <div className="w-full  lg::w-7/12">
        <div className="w-full">
          <StudentNavbarForStuDashboard panelId={panelId} />

          <div className="w-full mt-10 gap-5 flex-col justify-center flex items-center">
            <div className="pb-5">
              <PrimaryButtonSmall text={"User Profile"} />
            </div>
            <Image
              src={data.imgUrl}
              alt="profile pic"
              width={250}
              height={50}
              className="rounded-full"
            />
            <div className="container w-full md:w-11/12 lg:w-10/12 xl:w-45 2xl:w-5/12 px-5 xl:px-16 2xl:px-20 pt-16 pb-10 mx-auto mt-3.5   bg-[#f4f4f4] shadow-custom rounded-3xl">
              <div className="space-y-6">
                <div className="text-lg md:text-xl font-poppins flex gap-3">
                  <b>Name with Initials: </b>
                  <span>{data.nameWithInitials}</span>
                </div>
                <div className="text-lg md:text-xl font-poppins flex gap-3">
                  <b>Index No: </b>
                  <span>{data.universityID}</span>
                </div>
                <div className="text-lg md:text-xl font-poppins flex gap-3">
                  <b>Contact No: </b>
                  <span>{data.contactNo}</span>
                </div>
                <div className="text-lg md:text-xl font-poppins flex gap-3">
                  <b>Email: </b>
                  <span>{data.user.email}</span>
                </div>
                <div className="text-lg md:text-xl font-poppins flex gap-3">
                  <b>Degree: </b>
                  <span>{data.degree}</span>
                </div>
                <div className="flex md:flex-row justify-center flex-col md:gap-0 gap-4 mt-5">
                  <Link target="_blank" href={data.cvUrl}>
                    <button className="flex gap-3 items-center font-sans font-medium text-[17px] px-6 py-3 text-white bg-[#112735] border-2 border-transparent rounded-full transition duration-500 hover:text-[#f1c232] hover:border-[#f1c232] hover:shadow-[0_0.5em_1.5em_-0.5em_#113335] active:shadow-[0_0.3em_1em_-0.5em_#113335]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-file-earmark-arrow-down"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      </svg>
                      Download CV
                    </button>
                  </Link>
                </div>
                <div>
                  <Feedback panalistId={panelId} userId={data.candidate_id} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <StudentFooter />
      </div>
    </div>
  );
};

export default Dashboard;
