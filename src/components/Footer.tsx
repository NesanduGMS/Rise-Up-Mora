import { Facebook, Linkedin, Instagram, Globe, Mail, Calendar, Users, Zap } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    alert(`Thanks for subscribing with ${email}!`);
    setEmail('');
  };
  
  return (
    <footer className="bg-slate-900 text-white" style={{ backgroundColor: '#112735' }}>
      {/* Wave SVG Divider */}
      <div className="w-full overflow-hidden">
        <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                fill="#f1c232"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: '#f1c232' }}>
                <Zap size={24} className="text-slate-900" />
              </div>
              <h2 className="text-xl font-bold">IEEE UoM</h2>
            </div>
            <p className="text-gray-300 text-sm">
              The Institute of Electrical and Electronics Engineers (IEEE) Student Branch at University of Moratuwa is dedicated to fostering innovation and technological excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-colors hover:text-amber-400" style={{ color: '#f1c232' }}>
                <Facebook size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-amber-400" style={{ color: '#f1c232' }}>
                <Linkedin size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-amber-400" style={{ color: '#f1c232' }}>
                <Instagram size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-amber-400" style={{ color: '#f1c232' }}>
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#f1c232' }}>Quick Links</h3>
            <ul className="space-y-3">
              <li className="transition-transform hover:translate-x-2">
                <a href="#home" className="text-gray-300 hover:text-white flex items-center">
                  <span className="mr-2 text-xs" style={{ color: '#f1c232' }}>⬢</span>
                  Home
                </a>
              </li>
              <li className="transition-transform hover:translate-x-2">
                <a href="#about" className="text-gray-300 hover:text-white flex items-center">
                  <span className="mr-2 text-xs" style={{ color: '#f1c232' }}>⬢</span>
                  About Us
                </a>
              </li>
              <li className="transition-transform hover:translate-x-2">
                <a href="#events" className="text-gray-300 hover:text-white flex items-center">
                  <span className="mr-2 text-xs" style={{ color: '#f1c232' }}>⬢</span>
                  Events
                </a>
              </li>
              <li className="transition-transform hover:translate-x-2">
                <a href="#projects" className="text-gray-300 hover:text-white flex items-center">
                  <span className="mr-2 text-xs" style={{ color: '#f1c232' }}>⬢</span>
                  Projects
                </a>
              </li>
              <li className="transition-transform hover:translate-x-2">
                <a href="#team" className="text-gray-300 hover:text-white flex items-center">
                  <span className="mr-2 text-xs" style={{ color: '#f1c232' }}>⬢</span>
                  Our Team
                </a>
              </li>
              <li className="transition-transform hover:translate-x-2">
                <a href="#contact" className="text-gray-300 hover:text-white flex items-center">
                  <span className="mr-2 text-xs" style={{ color: '#f1c232' }}>⬢</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#f1c232' }}>Upcoming Events</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar size={20} style={{ color: '#f1c232' }} />
                </div>
                <div>
                  <h4 className="font-medium text-white">Tech Workshop</h4>
                  <p className="text-sm text-gray-300">May 15, 2025 • 10:00 AM</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar size={20} style={{ color: '#f1c232' }} />
                </div>
                <div>
                  <h4 className="font-medium text-white">Hackathon 2025</h4>
                  <p className="text-sm text-gray-300">June 5-7, 2025 • All day</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Users size={20} style={{ color: '#f1c232' }} />
                </div>
                <div>
                  <h4 className="font-medium text-white">IEEE Meetup</h4>
                  <p className="text-sm text-gray-300">June 20, 2025 • 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#f1c232' }}>Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter to stay updated with our latest news and events.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full pl-10 pr-4 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full px-4 py-2 rounded text-slate-900 font-medium transition-colors hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                style={{ backgroundColor: '#f1c232' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} IEEE Student Branch, University of Moratuwa. All rights reserved.
            </p>
            <div className="flex mt-4 md:mt-0 space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;