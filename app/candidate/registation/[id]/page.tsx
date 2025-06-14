import React from "react";
import Registration from "./components/Registration";
import MainBtn from "@/components/MainBtn";
import { checkUserId } from "@/service/checkUserId";
import { notFound } from "next/navigation";
import { getCandidate } from "@/service/getCandidate";
// import PrimaryButtonSmall from "@/components/MainButton";

const Page = async ({ params }: any) => {
  const userId = params.id;
  const userIdIsCorrect = await checkUserId({ userId });
  const candidate = await getCandidate({ userId });

  if (userIdIsCorrect)
    return (
      <div className="p-10 flex flex-col gap-10 ">
        <MainBtn text="Registration" />
        <div className="lg:pl-0 md:pl-10 pl-3">
          <Registration candidate={candidate} />
        </div>
      </div>
    );
  return notFound();
};

export default Page;
