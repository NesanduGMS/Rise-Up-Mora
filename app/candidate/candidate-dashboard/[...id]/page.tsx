import React from "react";
import Dashboard from "./components/Dashboard";
import { getCandidate } from "@/service/getCandidate";
import { notFound } from "next/navigation";

type Paramms = {
  params: {
    id: string;
  };
};

const StudentDashboard = async ({ params }: Paramms) => {
  const userId = params.id[0].split("-")[0];
  const panelId = params.id[0].split("-")[1];
  // console.log(userId, panelId);

  const candidate = await getCandidate({ userId });

  if (candidate == null || panelId == null) {
    notFound();
  }

  if (candidate) {
    return (
      <div>
        <Dashboard data={candidate} panelId={panelId} />
      </div>
    );
  }
};

export default StudentDashboard;
