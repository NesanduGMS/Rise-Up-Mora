import { Facebook, Linkedin, Instagram, Globe, Mail, Calendar, Users, Zap, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [animateSections, setAnimateSections] = useState(false);
  
  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => {
      setAnimateSections(true);
    }, 300);
  }, []);
  
  return (
    <footer className="bg-slate-900 text-white relative" style={{ backgroundColor: '#112735' }}>
      {/* Wave SVG Divider */}
      <div className="w-full overflow-hidden">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                fill="#f1c232"></path>
        </svg>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-5 w-20 h-20 rounded-full opacity-5 border border-amber-300"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-5 border-2 border-amber-300"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full opacity-5 bg-amber-300"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About Section */}
          <div className={`space-y-6 transition-all duration-700 ${animateSections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: '#f1c232' }}>
                <Zap size={24} className="text-slate-900" />
              </div>
              <h2 className="text-xl font-bold">IEEE UoM</h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Institute of Electrical and Electronics Engineers (IEEE) Student Branch at University of Moratuwa is dedicated to fostering innovation and technological excellence among future engineers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-all hover:text-amber-400 hover:scale-110" style={{ color: '#f1c232' }}>
                <Facebook size={20} />
              </a>
              <a href="#" className="transition-all hover:text-amber-400 hover:scale-110" style={{ color: '#f1c232' }}>
                <Linkedin size={20} />
              </a>
              <a href="#" className="transition-all hover:text-amber-400 hover:scale-110" style={{ color: '#f1c232' }}>
                <Instagram size={20} />
              </a>
              <a href="#" className="transition-all hover:text-amber-400 hover:scale-110" style={{ color: '#f1c232' }}>
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`transition-all duration-700 delay-100 ${animateSections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#f1c232' }}>Quick Links</h3>
            <ul className="space-y-3">
              {[
                {name: 'Home', href: '#home'},
                {name: 'About Us', href: '#about'},
                {name: 'Timeline', href: '#timeline'},
                {name: 'Partners', href: '#partners'},
                {name: 'Contact', href: '#contact'}
              ].map((link, index) => (
                <li key={index} className="transition-transform hover:translate-x-2">
                  <a href={link.href} className="text-gray-300 hover:text-white flex items-center">
                    <span className="mr-2 text-xs" style={{ color: '#f1c232' }}>⬢</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Events */}
          <div className={`transition-all duration-700 delay-200 ${animateSections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#f1c232' }}>Upcoming Events</h3>
            <div className="space-y-6">
              {[
                {icon: Calendar, title: 'Tech Workshop', date: 'May 15, 2025 • 10:00 AM'},
                {icon: Calendar, title: 'Hackathon 2025', date: 'June 5-7, 2025 • All day'},
                {icon: Users, title: 'IEEE Meetup', date: 'June 20, 2025 • 4:00 PM'}
              ].map((event, index) => (
                <div key={index} className="flex gap-4 group hover:bg-slate-800/30 p-2 rounded-lg transition-all">
                  <div className="flex-shrink-0">
                    <event.icon size={20} style={{ color: '#f1c232' }} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{event.title}</h4>
                    <p className="text-sm text-gray-300">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} IEEE Student Branch, University of Moratuwa. All rights reserved.
            </p>
            <div className="flex mt-4 md:mt-0 space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <a 
        href="#top" 
        className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-400 text-slate-900 p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300 z-50"
        aria-label="Back to top"
      >
        <ArrowRight size={20} className="transform rotate-270" />
      </a>
    </footer>
  );
};

export default Footer;