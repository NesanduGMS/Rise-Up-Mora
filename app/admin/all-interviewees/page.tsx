import { getCandidates } from "@/service/getCandidates";
import { Allocation, Candidate, Company, Feedback } from "@/Type";
import AllInterviewers from "./components/allInterviewers";
import { getFeedback } from "@/service/getFeedback";
import { getCompany } from "@/service/getCompany";
import { getAllocation } from "@/service/getInterviewAllocation";

const AllInterviewersPage = async (): Promise<JSX.Element> => {
  // Fetch data from APIs
  const response = await getCandidates();
  const companyResponse = await getCompany();
  const feedbackResponse = await getFeedback();
  const allAllocation = await getAllocation();

  // Initialize variables
  let initialCandidates: Candidate[] = [];
  let feedback: Feedback[] = [];
  let company: Company[] = [];
  let allocation: Allocation[] = [];

  // Validate and assign fetched data or throw error
  if (response && response.data) {
    initialCandidates = response.data;
  } else {
    throw new Error("Failed to fetch candidates");
  }

  if (feedbackResponse && feedbackResponse.data) {
    feedback = feedbackResponse.data;
  } else {
    throw new Error("Failed to fetch feedback");
  }

  if (companyResponse && companyResponse.data) {
    company = companyResponse.data;
  } else {
    throw new Error("Failed to fetch company");
  }

  if (allAllocation && allAllocation.data) {
    allocation = allAllocation.data;
  } else {
    throw new Error("Failed to fetch allocations");
  }

  // Render the AllInterviewers component with fetched data as props
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
