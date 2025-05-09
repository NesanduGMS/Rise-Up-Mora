import { BrowserRouter as Router } from 'react-router-dom';
import ApplicantRoutes from './routes/ApplicantRoutes';

function App() {
  return (
    <Router>
      <ApplicantRoutes />
      {/* You can add other route groups here, e.g., AdminRoutes, if needed */}
    </Router>
  );
}

export default App;