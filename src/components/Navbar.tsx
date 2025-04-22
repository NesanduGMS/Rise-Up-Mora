import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.webp';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'timeline', 'contact'];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
    setActiveSection(sectionId);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      {/* Navbar background with glass effect */}
      <div className={`absolute inset-0 ${scrolled ? 'bg-dark-blue shadow-lg' : 'bg-transparent'} transition-all duration-300`}></div>
      
      {/* Glass overlay - visible only when scrolled */}
      {scrolled && (
        <div className="absolute inset-0 backdrop-blur-md bg-dark-blue bg-opacity-80 z-0"></div>
      )}
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center group">
            <div className={`relative p-1 ${scrolled ? 'nav-logo-scrolled' : 'nav-logo'}`}>
              <img 
                src={logo} 
                alt="Rise Up Mora Logo" 
                className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
              />
              <div className="logo-glow"></div>
            </div>
            <span className={`ml-2 text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-gold' : 'text-white'} logo-text`}>
              Rise Up <span className="font-black">Mora</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {['home', 'about', 'timeline', 'contact'].map((item) => (
              <a 
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative px-4 py-3 mx-1 font-medium uppercase text-sm tracking-wider cursor-pointer transition-all duration-300 nav-link ${
                  activeSection === item 
                    ? `${scrolled ? 'text-gold' : 'text-gold'} nav-active` 
                    : `${scrolled ? 'text-white hover:text-gold' : 'text-white hover:text-gold'}`
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {activeSection === item && (
                  <span className="nav-indicator"></span>
                )}
              </a>
            ))}
            <button className="ml-4 px-6 py-3 font-medium text-dark-blue bg-gold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 transform hover:-translate-y-1 sign-in-btn">
              Sign In
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className={`p-2 rounded-full ${scrolled ? 'text-gold bg-dark-blue/50' : 'text-white bg-gold/10'} focus:outline-none transition-all duration-300`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-dark-blue backdrop-blur-lg shadow-xl transition-all duration-500 ease-in-out z-0 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="px-4 py-4 space-y-3">
          {['home', 'about', 'timeline', 'contact'].map((item) => (
            <a 
              key={item}
              onClick={() => scrollToSection(item)}
              className={`block px-4 py-3 text-lg font-medium border-l-2 transition-all duration-300 cursor-pointer ${
                activeSection === item 
                  ? 'border-gold text-gold' 
                  : 'border-transparent text-white hover:text-gold hover:border-gold/50'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <div className="pt-2">
            <button className="w-full px-6 py-3 font-medium text-dark-blue bg-gold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Add custom CSS */}
      <style jsx>{`
        .bg-dark-blue {
          background-color: #112735;
        }

        .text-dark-blue {
          color: #112735;
        }

        .bg-gold {
          background-color: #f1c232;
        }

        .text-gold {
          color: #f1c232;
        }

        .text-white {
          color: #ffffff;
        }

        .nav-logo {
          position: relative;
          padding: 8px;
          border-radius: 50%;
          background: #f1c232;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .nav-logo-scrolled {
          position: relative;
          padding: 8px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid #f1c232;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(241, 194, 50, 0.7) 0%, rgba(241, 194, 50, 0) 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .nav-logo:hover .logo-glow,
        .nav-logo-scrolled:hover .logo-glow {
          opacity: 1;
        }

        .logo-text {
          background: linear-gradient(to right, #ffffff, #f1f1f1);
          background-clip: text;
          -webkit-background-clip: text;
          transition: all 0.3s ease;
        }

        .nav-link {
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #f1c232;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::before {
          width: 70%;
        }

        .nav-active::before {
          width: 70%;
        }

        .nav-indicator {
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 8px;
          height: 8px;
          background-color: #f1c232;
          border-radius: 50%;
          transform: translateX(-50%) translateY(50%);
          box-shadow: 0 0 8px 2px rgba(241, 194, 50, 0.5);
        }

        .sign-in-btn {
          position: relative;
          overflow: hidden;
        }

        .sign-in-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: all 0.5s ease;
        }

        .sign-in-btn:hover::before {
          left: 100%;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;