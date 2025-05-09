import Hero from '../components/Hero';
import About from '../components/About';
import Timeline from '../components/Timeline';
import Partners from '../components/Partners';
import Contact from '../components/Contact';
import Navbar from '../components/general/Navbar';
import Footer from '../components/general/Footer';

const AllSections = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <About />
        <Timeline />
        <Partners />
        <Contact />
        <Footer />  
    </div>
  );
};

export default AllSections;
