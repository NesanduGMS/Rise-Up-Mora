import { getCandidates } from "@/service/getCandidates";
import { Allocation, Candidate, Company, Feedback, Panelist } from "@/Type";
import AllInterviewers from "./components/allInterviewers";
import { getFeedback } from "@/service/getFeedback";
import { getCompany } from "@/service/getCompany";
import { getAllocation } from "@/service/getInterviewAllocation";
import { getUserById } from "@/service/getUserById";
import { notFound } from "next/navigation";
import { getAllPanelistForOneCompany } from "@/service/getAllPanelistForOneCompany";
import { getCompanyAllocatin } from "@/service/getCompanyAllocatin";

interface AllocationType {
  allocation_id: string;
  allocation_date: string;
  allocation_timeSlot: string;
  allocated_panel_number: number;
  attendance: boolean;
  allocation_status: string;
  candidate_id: string;
  company_id: string;
  panelist_id: string;
  candidate: Candidate & {
    user: {
      email: string;
      createdAt: string;
      updatedAt: string;
      emailVerified: string | null;
      id: string;
      image: string;
      name: string;
      emailVerifyStatus: boolean;
      password: string;
      passwordResetToken: string;
      passwordResetTokenExpire: string;
      role: string;
    };
  };
}

export default async function CompanyCoordinator({
  params,
}: {
  params: { id: string };
}) {
  const companyCoordinatorId = params.id;

  const user = await getUserById({ userId: companyCoordinatorId });
  if (!user || user.role !== "companyCoordinator") {
    notFound();
  }

  const compnanyCoordinatorCompanyName =
    user.company_cordnator.company.company_name;
  const compnanyCoordinatorCompanyId = user.company_cordnator.company_id;

  const companyResponse = await getCompany();
  const feedbackResponse = await getFeedback();
  const allAllocationResponse = await getAllocation();
  const allPanelistResponse = await getAllPanelistForOneCompany(
    compnanyCoordinatorCompanyId
  );
  const allocationCandidate: AllocationType[] = await getCompanyAllocatin(
    compnanyCoordinatorCompanyId
  );

  const allCandidatesDetails: Candidate[] = allocationCandidate.map(
    (allocation) => allocation.candidate
  );

  const filterAllocation: Allocation[] =
    allAllocationResponse?.data?.filter(
      (allocation: Allocation) =>
        allocation.company_id === compnanyCoordinatorCompanyId
    ) || [];

  let feedback: Feedback[] = [];
  let company: Company[] = [];
  let allocation: Allocation[] = filterAllocation;
  let allPanelists: Panelist[] = [];

  if (feedbackResponse?.data) {
    feedback = feedbackResponse.data;
  } else {
    throw new Error("Failed to fetch feedback");
  }

  if (companyResponse?.data) {
    company = companyResponse.data;
  } else {
    throw new Error("Failed to fetch company");
  }

  if (!allAllocationResponse?.data) {
    throw new Error("Failed to fetch allocations");
  }

  if (allPanelistResponse?.data) {
    allPanelists = allPanelistResponse.data;
  } else {
    throw new Error("Failed to fetch panelists");
  }

  return (
    <AllInterviewers
      compnanyCoordinatorCompanyName={compnanyCoordinatorCompanyName}
      initialCandidates={allCandidatesDetails}
      feedbacks={feedback}
      company={company}
      allocation={allocation}
      allPanelists={allPanelists}
    />
  );
}
