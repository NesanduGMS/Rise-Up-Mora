import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignIn from './components/SignIn'; 

// Main layout component to hold the homepage content
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Partners />
      <Contact />
      <Footer />
    </>
  );
};

// Authentication pages layout - can be expanded later for sign up, etc.
const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <SignIn />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/signin" element={<AuthLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;