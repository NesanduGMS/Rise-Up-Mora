import { getCandidates } from "@/service/getCandidates";
import { Allocation, Candidate, Company, Feedback } from "@/Type";
import AllInterviewers from "./components/allInterviewers";
import { getFeedback } from "@/service/getFeedback";
import { getCompany } from "@/service/getCompany";
import { InterviewAllocation } from "@/service/InterviewAllocation";
import { getAllocation } from "@/service/getInterviewAllocation";
import { getUserById } from "@/service/getUserById";
import { notFound } from "next/navigation";
import { getDepartmentCordinatorByID } from "@/service/getDepartmentCordinatorById";

type Paramms = {
  params: {
    id: string;
  };
};

const DepartmentCordinatorPage = async ({ params }: Paramms) => {
  const departmentCoordinatorId = params.id;

  // Get department coordinator details
  const user = await getUserById({ userId: departmentCoordinatorId });

  if (user == null || user.role !== "departmentCoordinator") {
    return notFound();
  }

  // console.log("gggggggggggggggggggggggggggggggggg",departmentCoordinatorId);
  const departmentCoordinatorDepartmentName =
    user.department_cordnator?.department;

  // Fetch candidates and filter based on department
  const response = await getCandidates();
  const filterResponse = response.data.filter(
    (candidate: Candidate) =>
      candidate.department === departmentCoordinatorDepartmentName
  );

  const companyResponce = await getCompany();
  const feedbackResponse = await getFeedback();
  const allAllocation = await getAllocation();

  // Initialize arrays to store the filtered data
  let initialCandidates: Candidate[] = filterResponse || [];
  let feedback: Feedback[] = feedbackResponse.data || [];
  let company: Company[] = companyResponce.companies || [];
  let allocation: Allocation[] = allAllocation.data || [];

  return (
    <AllInterviewers
      department={departmentCoordinatorDepartmentName}
      departmentCordinatorId={departmentCoordinatorId}
      initialCandidates={initialCandidates}
      feedbacks={feedback}
      company={company}
      allocation={allocation}
    />
  );
};

export default DepartmentCordinatorPage;
