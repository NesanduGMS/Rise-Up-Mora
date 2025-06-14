import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import NextLink from 'next/link'; // Renamed to NextLink to avoid conflict if 'Link' is used as a variable
import { useRouter } from 'next/navigation';
import logo from '../assets/logo.webp'; // Assuming assets folder is one level up from components
import logo2 from '../assets/logo2.png'; // Assuming assets folder is one level up from components

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();

  const navItems = ['home', 'about', 'timeline', 'partners', 'gallery', 'contact']; // Added 'gallery'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      let currentSection = '';
      for (const sectionId of navItems) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
            break;
          }
        }
      }
      // If no section is perfectly in view, try to keep the current active one if it's still somewhat visible
      // or default to 'home' if nothing is active. This prevents flickering if sections are small.
      if (currentSection) {
        setActiveSection(currentSection);
      } else {
        // Check if current active section is still in viewport, otherwise, don't change unless a new one is found
        const activeEl = document.getElementById(activeSection);
        if (activeEl && activeEl.getBoundingClientRect().bottom < 0 || activeEl && activeEl.getBoundingClientRect().top > window.innerHeight) {
          // Active section is completely out of view, look for the topmost visible section
            for (const sectionId of navItems) {
                const section = document.getElementById(sectionId);
                if (section && section.getBoundingClientRect().top >=0 && section.getBoundingClientRect().top < window.innerHeight) {
                    setActiveSection(sectionId);
                    break;
                }
            }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, navItems]); // Dependencies are correct

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Dynamically get navbar height if possible, otherwise fallback to 80
      const navElement = document.querySelector('nav');
      const navHeight = navElement ? navElement.offsetHeight : 80;
      window.scrollTo({
        top: section.offsetTop - navHeight,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
    // setActiveSection(sectionId); // Active section is now primarily set by scroll handler
  };

  const handleSignInClick = () => {
    router.push('/auth/signin'); // Adjusted for Next.js and common auth path
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 scrolled-nav' : 'py-6'}`}>
      <div className={`absolute inset-0 ${scrolled ? 'bg-dark-blue shadow-lg' : 'bg-transparent'} transition-all duration-300`}></div>
      
      {scrolled && (
        <div className="absolute inset-0 backdrop-blur-md bg-dark-blue bg-opacity-80 z-0"></div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center">
          <NextLink href="/" passHref legacyBehavior>
            <a onClick={() => scrollToSection('home')} className="flex items-center cursor-pointer">
              <img
                src={scrolled ? logo2.src : logo.src} // Use .src if images are imported as modules
                alt="Rise Up Mora Logo"
                className="h-10 w-auto transition-all duration-300"
              />
              <span
                className={`ml-2 text-2xl font-bold transition-colors duration-300 logo-text`}
              >
                Rise Up <span className="font-black">Mora</span>
              </span>
            </a>
          </NextLink>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => ( // This will now include 'gallery'
              <a 
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative px-4 py-3 mx-1 font-medium uppercase text-sm tracking-wider cursor-pointer transition-all duration-300 nav-link ${
                  activeSection === item 
                    ? 'nav-active' 
                    : ''
                } ${scrolled ? 'text-gold hover:text-gold' : 'text-white hover:text-gray-200'}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {activeSection === item && (
                  <span className={`nav-indicator ${scrolled ? 'bg-gold' : 'bg-gold'}`}></span>
                )}
              </a>
            ))}
            <button 
              onClick={handleSignInClick}
              className="ml-4 px-6 py-3 font-medium text-dark-blue bg-gold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 transform hover:-translate-y-1 sign-in-btn"
            >
              Sign In
            </button>
          </div>
          
          <div className="md:hidden">
            <button 
              aria-label="Toggle menu"
              className={`p-2 rounded-full focus:outline-none transition-all duration-300 ${scrolled ? 'text-gold bg-dark-blue/50' : 'text-white bg-gold/10'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className={`md:hidden absolute w-full bg-dark-blue backdrop-blur-lg shadow-xl transition-all duration-500 ease-in-out z-0 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none' // Adjusted max-h for more items
        } overflow-hidden`}
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => ( // This will now include 'gallery'
            <a 
              key={item}
              onClick={() => scrollToSection(item)}
              className={`block px-4 py-3 text-lg font-medium border-l-2 transition-all duration-300 cursor-pointer ${
                activeSection === item 
                  ? 'border-gold text-gold' 
                  : 'border-transparent text-gold hover:text-gold hover:border-gold/50'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <div className="pt-2">
            <button 
              onClick={handleSignInClick}
              className="w-full px-6 py-3 font-medium text-dark-blue bg-gold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .bg-dark-blue { background-color: #112735; }
        .text-dark-blue { color: #112735; }
        .bg-gold { background-color: #f1c232; }
        .text-gold { color: #f1c232 !important; }

        /* Logo text styling */
        .logo-text {
          transition: color 0.3s ease;
        }
        nav:not(.scrolled-nav) .logo-text {
          color: #112735; /* Navy blue for non-scrolled */
          background: none; /* Remove gradient */
          -webkit-background-clip: initial; /* Reset background clip */
          background-clip: initial; /* Reset background clip */
        }
        nav.scrolled-nav .logo-text {
          color: #f1c232; /* Gold when scrolled */
          background: none; /* Ensure no gradient when scrolled */
        }

        .nav-link {
          position: relative;
          overflow: hidden;
        }
        nav:not(.scrolled-nav) .nav-link {
            color: #112735; /* Dark text on transparent bg */
        }
         nav:not(.scrolled-nav) .nav-link:hover {
            color: #0d1f2b; /* Slightly darker on hover */
        }
        nav.scrolled-nav .nav-link {
            color: #f1c232; /* Gold text on dark bg */
        }
        nav.scrolled-nav .nav-link:hover {
            color: #d4af2b; /* Darker gold on hover */
        }
        nav .nav-link.nav-active {
             color: #f1c232 !important; /* Active link is always gold */
        }


        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #f1c232; /* Gold underline */
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover::before,
        .nav-link.nav-active::before {
          width: 70%;
        }

        .nav-indicator {
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transform: translateX(-50%) translateY(50%);
          box-shadow: 0 0 8px 2px rgba(241, 194, 50, 0.5); /* Gold shadow */
        }
        nav:not(.scrolled-nav) .nav-indicator {
            background-color: #112735; /* Dark indicator on transparent bg */
        }
         nav.scrolled-nav .nav-indicator {
            background-color: #f1c232; /* Gold indicator on dark bg */
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
