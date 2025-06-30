import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Instagram, Globe, Calendar, Users, Zap, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [animateSections, setAnimateSections] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setAnimateSections(true);
    }, 300);

    const handleScroll = () => {
      if (window.scrollY > 200) { // Show button even earlier
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickLinks = [
    {name: 'Home', href: '#home'},
    {name: 'About Us', href: '#about'},
    {name: 'Timeline', href: '#timeline'},
    {name: 'Partners', href: '#partners'},
    {name: 'Gallery', href: '#gallery'}, // Added Gallery
    {name: 'Contact', href: '#contact'}
  ];

  const upcomingEvents = [
    {icon: Calendar, title: 'Registrations Opening', date: 'July 17th, 2025 • 6:00 PM'}, // Updated date
    {icon: Calendar, title: 'Registrations Closing', date: 'July 29th, 2025 • 5:00 PM'}, // Updated date
    {icon: Users, title: 'Internship & Mock Interview Fair', date: '31st July 2025 • 5:00 PM'} // Updated date & title
  ];
  
  return (
    <footer className="bg-slate-900 text-white relative" style={{ backgroundColor: '#112735' }}>
      {/* Wave SVG Divider - Further Reduced height */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg className="w-full h-12 md:h-16 lg:h-20" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ fill: '#f1c232' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
      
      {/* Decorative elements - Adjusted positions slightly if needed due to height change */}
      <div className="absolute top-12 left-4 w-14 h-14 rounded-full opacity-5 border border-amber-300 animate-pulse"></div>
      <div className="absolute bottom-12 right-8 w-20 h-20 rounded-full opacity-5 border-2 border-amber-300 animate-pulse delay-500"></div>
      <div className="absolute top-1/3 right-1/4 w-10 h-10 rounded-full opacity-5 bg-amber-300 animate-ping"></div>
      
      {/* Reduced overall padding py-10 from py-12 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Reduced gap */}
          {/* About Section - Reduced space-y-3 from space-y-4 */}
          <div className={`space-y-3 transition-all duration-700 ease-out ${animateSections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: '#f1c232' }}>
                <Zap size={28} className="text-slate-900" /> {/* Increased icon size */}
              </div>
              <h2 className="text-3xl font-bold text-white">IEEE UoM</h2> {/* Increased font size */}
            </div>
            <p className="text-gray-100 text-lg leading-relaxed"> {/* Increased font size and changed color slightly */}
              The Institute of Electrical and Electronics Engineers (IEEE) Student Branch at University of Moratuwa is dedicated to fostering innovation and technological excellence.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/IEEEUOM" target="_blank" rel="noopener noreferrer" className="transition-all hover:text-amber-400 hover:scale-110" style={{ color: '#f1c232' }} aria-label="Facebook">
                <Facebook size={24} /> {/* Increased icon size */}
              </a>
              <a href="https://www.linkedin.com/company/ieeeuom" target="_blank" rel="noopener noreferrer" className="transition-all hover:text-amber-400 hover:scale-110" style={{ color: '#f1c232' }} aria-label="LinkedIn">
                <Linkedin size={24} /> {/* Increased icon size */}
              </a>
              <a href="https://www.instagram.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="transition-all hover:text-amber-400 hover:scale-110" style={{ color: '#f1c232' }} aria-label="Instagram">
                <Instagram size={24} /> {/* Increased icon size */}
              </a>
              <a href="https://ieee.uom.lk" target="_blank" rel="noopener noreferrer" className="transition-all hover:text-amber-400 hover:scale-110" style={{ color: '#f1c232' }} aria-label="Website">
                <Globe size={24} /> {/* Increased icon size */}
              </a>
            </div>
          </div>

          {/* Quick Links - Reduced mb-3 from mb-4, space-y-2 from space-y-2.5 */}
          <div className={`transition-all duration-700 ease-out delay-100 ${animateSections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-semibold mb-3" style={{ color: '#f1c232' }}>Quick Links</h3> {/* Increased font size */}
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name} className="transition-transform hover:translate-x-1.5">
                  <a 
                    href={link.href} 
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.querySelector(link.href);
                      if (section) {
                        const navbarHeight = document.querySelector('nav')?.offsetHeight || 60; // Adjusted default navbar height
                        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                        window.scrollTo({ top: sectionTop, behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-100 hover:text-white flex items-center group text-lg" /* Increased font size */
                  >
                    <span className="mr-2.5 text-base transition-colors duration-300 group-hover:text-white" style={{ color: '#f1c232' }}>⬢</span> {/* Adjusted size/margin */}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Events - Reduced mb-3 from mb-4, space-y-3 from space-y-4 */}
          <div className={`transition-all duration-700 ease-out delay-200 ${animateSections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-semibold mb-3" style={{ color: '#f1c232' }}>Upcoming Events</h3> {/* Increased font size */}
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex gap-3 group hover:bg-slate-800/30 p-1.5 rounded-lg transition-all cursor-pointer" onClick={() => alert(`More details about ${event.title} coming soon!`)}> {/* Reduced padding */}
                  <div className="flex-shrink-0 pt-0.5">
                    <event.icon size={24} style={{ color: '#f1c232' }} className="group-hover:scale-110 transition-transform" /> {/* Increased icon size */}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">{event.title}</h4> {/* Increased font size */}
                    <p className="text-base text-gray-300">{event.date}</p> {/* Increased date size */}
                  </div>
                </div>
              ))}
               <Link href="/events" passHref legacyBehavior>
                <a className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors group text-lg mt-1"> {/* Increased font size, added margin top */}
                  View All Events
                  <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" /> {/* Increased icon size */}
                </a>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom section - Reduced mt-10 pt-5 from mt-12 pt-6 */}
        <div className="mt-10 pt-5 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-lg text-gray-200 mb-2 md:mb-0"> {/* Increased font size */}
              &copy; {new Date().getFullYear()} IEEE Student Branch, University of Moratuwa. All rights reserved.
            </p>
            <div className="flex space-x-3 md:space-x-4"> {/* Adjusted spacing */}
              <Link href="/privacy-policy" passHref legacyBehavior><a className="text-lg text-gray-200 hover:text-white transition-colors">Privacy Policy</a></Link> {/* Increased font size */}
              <Link href="/terms-of-service" passHref legacyBehavior><a className="text-lg text-gray-200 hover:text-white transition-colors">Terms of Service</a></Link> {/* Increased font size */}
              <Link href="/sitemap" passHref legacyBehavior><a className="text-lg text-gray-200 hover:text-white transition-colors">Sitemap</a></Link> {/* Increased font size */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to top button - Adjusted position slightly */}
      {showBackToTop && (
        <a 
          href="#top" 
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-amber-500 hover:bg-amber-400 text-slate-900 p-2.5 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300 z-50 animate-bounce"
          aria-label="Back to top"
        >
          <ArrowRight size={24} className="transform -rotate-90" /> {/* Increased icon size */}
        </a>
      )}
    </footer>
  );
};

export default Footer;
