import { getCandidates } from "@/service/getCandidates";
// import RegisterCandidate from "@/components/RegisterCandidate";
import { Candidate } from "@/Type";
import RegisterCandidate from "./components/RegisterCandidate";

const RegisterCandidatePage = async () => {
  const response = await getCandidates();
  let initialCandidates: Candidate[] = [];

  if (response && response.data) {
    initialCandidates = response.data;
  } else {
    new Error("Failed to fetch candidates");
  }

  return <RegisterCandidate initialCandidates={initialCandidates} />;
};

export default RegisterCandidatePage;
