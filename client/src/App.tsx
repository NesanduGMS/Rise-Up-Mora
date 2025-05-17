import { BrowserRouter as Router } from 'react-router-dom';
import ApplicantRoutes from './routes/ApplicantRoutes';

import CanvasCursor from './components/ui/CanvasCursor'; ////


function App() {
  return (
    <Router>
      <CanvasCursor />
      <ApplicantRoutes />
      {/* You can add other route groups here, e.g., AdminRoutes, if needed */}
    </Router>
  );
}

export default App;