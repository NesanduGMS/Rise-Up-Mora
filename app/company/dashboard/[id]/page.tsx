import React from "react";
import StudentNavbar from "@/components/StudentNavbar";
import ParticipantTable from "@/components/ParticipantTable";

type Params = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Params) => {
  const panelistId = params.id;

  return (
    <div>
      <div className="ml-20 mr-20">
        <StudentNavbar />
      </div>

      <div className="container mx-auto p-4">
        <ParticipantTable panelistId={panelistId} />
      </div>
    </div>
  );
};

export default Page;
