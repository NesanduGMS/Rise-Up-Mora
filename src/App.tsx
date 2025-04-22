import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About'
import Timeline from './components/Timeline';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;