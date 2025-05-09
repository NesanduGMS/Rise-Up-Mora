import { Routes, Route } from 'react-router-dom';
import AllSections from '../pages/AllSections';
import SignIn from '../pages/SignIn';

const ApplicantRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AllSections />} />
      <Route path="/signin" element={<SignIn />} />
      {/* Add other applicant-specific routes here if needed */}
    </Routes>
  );
};

export default ApplicantRoutes;