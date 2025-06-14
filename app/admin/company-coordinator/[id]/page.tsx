import { getCandidates } from "@/service/getCandidates";
import { Allocation, Candidate, Company, Feedback, Panelist } from "@/Type";
import AllInterviewers from "./components/allInterviewers";
import { getFeedback } from "@/service/getFeedback";
import { getCompany } from "@/service/getCompany";
import { InterviewAllocation } from "@/service/InterviewAllocation";
import { getAllocation } from "@/service/getInterviewAllocation";
import { getUserById } from "@/service/getUserById";
import { notFound } from "next/navigation";
import { all } from "axios";
import { getAllPanelistForOneCompany } from "@/service/getAllPanelistForOneCompany";
import { getCompanyAllocatin } from "@/service/getCompanyAllocatin";

type Paramms = {
  params: {
    id: string;
  };
};

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
  candidate: {
    candidate_id: string;
    firstName: string;
    lastName: string;
    nameWithInitials: string;
    universityID: string;
    contactNo: string;
    department: string;
    degree: string;
    cvUrl: string;
    imgUrl: string;
    createdAt: string;
    updatedAt: string;
    prefCompany1: string | null;
    prefCompany2: string | null;
    prefCompany3: string | null;
    prefCompany4: string | null;
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

const CompanyCoordinator = async ({ params }: Paramms) => {
  // get company coordinator id from params
  const companyCoordinatorId = params.id;

  // get company coordinator details
  const user = await getUserById({ userId: companyCoordinatorId });

  // if that user is not a company coordinator, return 404
  if (user == null || user.role !== "companyCoordinator") {
    notFound();
  }

  // get company name of the company coordinator
  const compnanyCoordinatorCompanyName =
    user.company_cordnator.company.company_name;

  const compnanyCoordinatorCompanyId = user.company_cordnator.company_id;

  /////////////////////////// above code done by ruchith ///////////////////////////

  // const response = await getCandidates();
  const companyResponce = await getCompany();
  const feedbackResponse = await getFeedback();
  const allAllocation = await getAllocation();
  const allPanelist = await getAllPanelistForOneCompany(
    compnanyCoordinatorCompanyId
  );

  const allocationCandidate: AllocationType[] = await getCompanyAllocatin(
    compnanyCoordinatorCompanyId
  );

  const allCandidatesDetails: Candidate[] = allocationCandidate.map(
    (allocation: AllocationType) => allocation.candidate
  );

  // console.log(allCandidatesDetails);

  const filterAllocation = allAllocation.data.filter(
    (allocation: Allocation) =>
      allocation.company_id === compnanyCoordinatorCompanyId
  );
  // console.log(filterAllocation);

  // const filterResponse = response.data.filter(
  //   (allocation: Allocation) =>
  //     allocation.company_id === compnanyCoordinatorCompanyId
  // );

  let initialCandidates: Candidate[] = [];
  let feedback: Feedback[] = [];
  let company: Company[] = [];
  let allocation: Allocation[] = filterAllocation?.data || [];
  let allPanelists: Panelist[] = [];

  // if (response && response.data) {
  //   initialCandidates = response.data.filter((candidate: Candidate) =>
  //     filterAllocation.some(
  //       (allocation: Allocation) =>
  //         allocation.candidate_id === candidate.candidate_id
  //     )
  //   );
  // } else {
  //   throw new Error("Failed to fetch candidates");
  // }

  // console.log("initialCandidates", initialCandidates);

  if (feedbackResponse && feedbackResponse.data) {
    feedback = feedbackResponse.data;
  } else {
    new Error("Failed to fetch feedback");
  }

  if (companyResponce && companyResponce.data) {
    company = companyResponce.data;
  } else {
    new Error("Failed to fetch company");
  }
  if (allAllocation && allAllocation.data) {
    allocation = allAllocation.data;
  } else {
    new Error("Failed to fetch Allocations");
  }
  if (allPanelist && allPanelist.data) {
    allPanelists = allPanelist.data;
  } else {
    new Error("Failed to fetch Panelist");
  }

  // console.log("allocation", allocation);
  // console.log("initialCandidates", initialCandidates);

  return (
    <AllInterviewers
      compnanyCoordinatorCompanyName={compnanyCoordinatorCompanyName}
      initialCandidates={allCandidatesDetails}
      feedbacks={feedback}
      company={company}
      allocation={filterAllocation}
      allPanelists={allPanelists}
    />
  );
};

export default CompanyCoordinator;
