import { getCandidates } from "@/service/getCandidates";
import { Allocation, Candidate, Company, Feedback } from "@/Type";
import AllInterviewers from "./components/allInterviewers";
import { getFeedback } from "@/service/getFeedback";
import { getCompany } from "@/service/getCompany";
import { InterviewAllocation } from "@/service/InterviewAllocation";
import { getAllocation } from "@/service/getInterviewAllocation";

const AllInterviewersPage = async () => {
  const response = await getCandidates();
  const companyResponce = await getCompany();
  const feedbackResponse = await getFeedback();
  const allAllocation = await getAllocation();

  let initialCandidates: Candidate[] = [];
  let feedback: Feedback[] = [];
  let company: Company[] = [];
  let allocation: Allocation[] = [];
  if (response && response.data) {
    initialCandidates = response.data;
  } else {
    new Error("Failed to fetch candidates");
  }

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

  return (
    <AllInterviewers
      initialCandidates={initialCandidates}
      feedbacks={feedback}
      company={company}
      allocation={allocation}
    />
  );
};

export default AllInterviewersPage;
