import { useState, useCallback, memo, useEffect } from 'react';
import { Mail, Phone, User, Link, ExternalLink, MessageSquare, Send, Sparkles, MapPin, Coffee, Moon, Sun } from 'lucide-react';

// Enhanced style constants
const COLORS = {
  primary: '#112735',
  accent: '#f1c232',
  accentAlt: '#ff6b6b',
  lightGray: '#e2e8f0',
  white: '#ffffff',
  night: '#1a202c',
  gradientStart: '#5433FF',
  gradientEnd: '#20BDFF',
};

// Particle component for background animation
interface ParticleProps {
  index: number;
}

const Particle = memo(({ index }: ParticleProps) => {
  const size = Math.floor(Math.random() * 6) + 3;
  const initialPosition = {
    x: Math.random() * 100,
    y: Math.random() * 100,
  };
  const speed = (Math.random() * 20) + 10;
  const opacity = (Math.random() * 0.5) + 0.1;
  
  return (
    <div 
      className="absolute rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${initialPosition.x}%`,
        top: `${initialPosition.y}%`,
        backgroundColor: Math.random() > 0.5 ? COLORS.accent : COLORS.accentAlt,
        opacity: opacity,
        animation: `float-around ${speed}s linear infinite`,
        animationDelay: `${index * 0.3}s`
      }}
    />
  );
});

// Enhanced animated input with icon support
interface AnimatedInputProps {
  label: string;
  icon?: JSX.Element;
  type?: string;
  placeholder?: string;
  className?: string;
}

const AnimatedInput = memo(({ label, icon, type = "text", placeholder, className = "" }: AnimatedInputProps) => {
  const [inputState, setInputState] = useState({ focused: false, hasValue: false });
  
  const handleFocus = useCallback(() => 
    setInputState(prev => ({ ...prev, focused: true })), []);
  
  const handleBlur = useCallback((e) => 
    setInputState({ focused: false, hasValue: e.target.value.length > 0 }), []);
  
  const activeLabel = inputState.focused || inputState.hasValue;
  
  return (
    <div className={`relative ${className}`}>
      <label 
        className={`absolute transition-all duration-300 text-sm flex items-center ${
          activeLabel 
            ? '-top-7 left-0 text-yellow-500 font-medium' 
            : 'top-3 left-3 text-gray-500'
        }`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            className="w-full px-4 py-3 border-2 bg-gray-50 rounded-lg focus:outline-none transition-all duration-300"
            style={{ 
              borderColor: inputState.focused ? COLORS.accent : 'transparent',
              backgroundColor: inputState.focused ? 'rgba(241, 194, 50, 0.05)' : 'rgba(255, 255, 255, 0.9)',
              boxShadow: inputState.focused ? '0 4px 20px rgba(241, 194, 50, 0.15)' : '0 2px 10px rgba(0,0,0,0.05)',
              minHeight: '120px'
            }}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        ) : (
          <input
            type={type}
            className="w-full px-4 py-3 border-2 bg-gray-50 rounded-lg focus:outline-none transition-all duration-300"
            style={{ 
              borderColor: inputState.focused ? COLORS.accent : 'transparent',
              backgroundColor: inputState.focused ? 'rgba(241, 194, 50, 0.05)' : 'rgba(255, 255, 255, 0.9)',
              boxShadow: inputState.focused ? '0 4px 20px rgba(241, 194, 50, 0.15)' : '0 2px 10px rgba(0,0,0,0.05)'
            }}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
        <div 
          className="absolute bottom-0 left-0 h-1 transition-all duration-500 ease-out rounded-full"
          style={{ 
            width: inputState.focused ? '100%' : '0%', 
            backgroundColor: COLORS.accent,
            opacity: 0.8
          }}
        />
      </div>
    </div>
  );
});

// Enhanced contact card with hover effects and animations
interface ContactCardProps {
  name: string;
  role: string;
  organization?: string;
  email: string;
  phone: string;
  social?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
  index: number;
}

const ContactCard = memo(({ name, role, organization, email, phone, social, index }: ContactCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // Simple intersection observer for animation when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const element = document.getElementById(`contact-card-${index}`);
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, [index]);
  
  return (
    <div 
      id={`contact-card-${index}`}
      className={`bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 relative ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      } ${isHovered ? 'scale-105' : ''}`}
      style={{ 
        animationDelay: `${index * 0.2}s`,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(17, 39, 53, 0.15), 0 0 0 2px rgba(241, 194, 50, 0.5)' 
          : '0 10px 25px rgba(17, 39, 53, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner accent */}
      <div 
        className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
        style={{ transition: 'all 0.3s ease', transform: isHovered ? 'scale(1.2)' : 'scale(1)' }}
      >
        <div 
          className="absolute transform rotate-45 bg-gradient-to-r from-yellow-500 to-yellow-400"
          style={{ 
            width: '200%', 
            height: '200%', 
            top: '-100%', 
            left: '50%', 
            boxShadow: '0 0 10px rgba(241, 194, 50, 0.5)' 
          }}
        />
      </div>
      
      {/* Accent line */}
      <div 
        className="absolute left-0 top-4 bottom-4 w-1 rounded-full transition-all duration-300"
        style={{ 
          background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.accentAlt})`,
          opacity: isHovered ? 1 : 0.7,
          transform: isHovered ? 'scaleY(1.1)' : 'scaleY(1)'
        }}
      />
      
      <div className="flex items-center mb-6 relative z-10">
        <div className={`bg-gray-100 p-3 rounded-full mr-4 transition-all duration-300 ${
          isHovered ? 'bg-yellow-100 shadow-lg' : ''
        }`}>
          <User 
            className={`transition-all duration-300 ${
              isHovered ? 'text-yellow-600' : 'text-yellow-500'
            }`} 
            size={24} 
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400">
            {role}
          </p>
          {organization && (
            <p className="text-xs text-gray-500 mt-1">{organization}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className={`flex items-center transition-all duration-500 ${
          isHovered ? 'translate-x-2' : ''
        }`}>
          <div className="bg-gray-100 p-2 rounded-full mr-3 transition-all duration-300">
            <Mail className="text-gray-500 w-4 h-4" />
          </div>
          <a 
            href={`mailto:${email}`} 
            className={`text-sm text-gray-600 hover:text-yellow-500 transition-colors relative group`}
          >
            {email}
            <span 
              className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"
            />
          </a>
        </div>
        
        <div className={`flex items-center transition-all duration-500 ${
          isHovered ? 'translate-x-2' : ''
        }`} style={{ transitionDelay: '0.1s' }}>
          <div className="bg-gray-100 p-2 rounded-full mr-3 transition-all duration-300">
            <Phone className="text-gray-500 w-4 h-4" />
          </div>
          <a 
            href={`tel:${phone}`} 
            className="text-sm text-gray-600 hover:text-yellow-500 transition-colors relative group"
          >
            {phone}
            <span 
              className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"
            />
          </a>
        </div>
      </div>
      
      {social && Object.values(social).some(Boolean) && (
        <div className="mt-6 flex items-center justify-start space-x-4 pt-4 border-t border-gray-100">
          {social.website && (
            <a 
              href={social.website} 
              className="text-gray-400 hover:text-yellow-500 transition-colors transform hover:scale-110 duration-200" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Website"
            >
              <Link size={18} />
            </a>
          )}
          {social.linkedin && (
            <a 
              href={social.linkedin} 
              className="text-gray-400 hover:text-yellow-500 transition-colors transform hover:scale-110 duration-200" 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {social.twitter && (
            <a 
              href={social.twitter} 
              className="text-gray-400 hover:text-yellow-500 transition-colors transform hover:scale-110 duration-200" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Twitter"
            >
              <MessageSquare size={18} />
            </a>
          )}
        </div>
      )}
      
      {/* Animated corner sparkle */}
      <div 
        className={`absolute -bottom-2 -right-2 text-yellow-400 transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-0 scale-0'
        }`}
      >
        <Sparkles size={24} />
      </div>
    </div>
  );
});

// Enhanced contact form with animations and interactive button
const ContactForm = memo(() => {
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSuccess: false,
    isHovering: false
  });
  
  const [theme, setTheme] = useState('light');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({ ...formState, isSubmitting: true });
    
    // Simulate form submission
    setTimeout(() => {
      setFormState({ 
        isSubmitting: false, 
        isSuccess: true,
        isHovering: false
      });
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }));
      }, 3000);
    }, 1500);
  };
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div 
      className={`rounded-2xl relative overflow-hidden transition-all duration-500 z-10`}
      style={{ 
        backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 32, 44, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: theme === 'light' 
          ? '0 10px 30px rgba(0, 0, 0, 0.1)' 
          : '0 10px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Theme toggle button */}
      <button 
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-300"
        style={{ 
          backgroundColor: theme === 'light' ? COLORS.lightGray : COLORS.night,
          color: theme === 'light' ? COLORS.night : COLORS.white
        }}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </button>
      
      {/* Gradient border at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-blue-500"></div>
      
      <div className="p-8">
        <h3 
          className={`text-2xl md:text-3xl font-bold mb-6 relative transition-colors duration-300 flex items-center`}
          style={{ color: theme === 'light' ? COLORS.primary : COLORS.white }}
        >
          <Coffee className="inline-block mr-3 text-yellow-500" size={24} />
          <span>Let's Connect</span>
          <span 
            className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full pulse-animation"
          />
        </h3>
        
        <p 
          className="mb-8 transition-colors duration-300"
          style={{ color: theme === 'light' ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)' }}
        >
          Have questions about IEEE Student Branch activities? Want to collaborate or sponsor an event? 
          Drop us a message and we'll get back to you soon.
        </p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedInput 
              label="Your Name" 
              icon={<User size={14} />}
              placeholder="John Doe" 
            />
            <AnimatedInput 
              label="Your Email" 
              icon={<Mail size={14} />}
              type="email" 
              placeholder="john@example.com" 
            />
          </div>
          
          <AnimatedInput 
            label="Subject" 
            placeholder="How can we help you?" 
          />
          
          <AnimatedInput 
            label="Your Message" 
            icon={<MessageSquare size={14} />}
            type="textarea" 
            placeholder="Tell us about your inquiry..." 
          />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <MapPin size={16} className="mr-2 text-yellow-500" />
              <span 
                className="transition-colors duration-300"
                style={{ color: theme === 'light' ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)' }}
              >
                University of Moratuwa, Sri Lanka
              </span>
            </div>
            
            <button 
              type="submit"
              disabled={formState.isSubmitting || formState.isSuccess}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-500 flex items-center overflow-hidden relative ${
                formState.isSuccess ? 'bg-green-500 text-white' : ''
              }`}
              style={{ 
                backgroundColor: formState.isHovering ? COLORS.accent : COLORS.primary,
                color: formState.isHovering ? '#000' : '#fff',
              }}
              onMouseEnter={() => setFormState(prev => ({ ...prev, isHovering: true }))}
              onMouseLeave={() => setFormState(prev => ({ ...prev, isHovering: false }))}
            >
              <span 
                className={`transition-all duration-300 mr-2 ${
                  formState.isHovering ? 'text-gray-800' : 'text-white'
                }`}
              >
                {formState.isSubmitting ? 'Sending...' : formState.isSuccess ? 'Sent!' : 'Send Message'}
              </span>
              
              <Send 
                size={18} 
                className={`transition-all duration-300 ${
                  formState.isHovering ? 'text-gray-800 translate-x-1' : 'text-white'
                } ${formState.isSubmitting ? 'animate-pulse' : ''}`} 
              />
              
              <span 
                className="absolute inset-0 w-0 transition-all duration-500 h-full rounded-full" 
                style={{ 
                  width: formState.isHovering ? '100%' : '0%', 
                  backgroundColor: COLORS.accent,
                  zIndex: -1 
                }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

// Global CSS styles enhancement
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    
    @keyframes float-around {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(20px, -30px) rotate(90deg); }
      50% { transform: translate(-20px, -50px) rotate(180deg); }
      75% { transform: translate(-30px, -20px) rotate(270deg); }
      100% { transform: translate(0, 0) rotate(360deg); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .card-animation {
      opacity: 0;
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .pulse-animation {
      animation: pulse 2s ease-in-out infinite;
    }
    
    .shimmer {
      background: linear-gradient(90deg, transparent, rgba(241, 194, 50, 0.2), transparent);
      background-size: 200% 100%;
      animation: shimmer 3s infinite;
    }
    
    .text-gradient {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(90deg, #5433FF, #20BDFF, #A5FECB);
    }
    
    .contact-layout-transition {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `}</style>
);

// Main enhanced contact section
const EnhancedContact = () => {
  const [layout, setLayout] = useState('default');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Contact card data
  const contactData = [
    {
      name: "Senel Perera",
      role: "Chairman",
      organization: "IEEE Student Branch of University Of Moratuwa",
      email: "senel.ephraims@ieee.org",
      phone: "0770410762", 
      social: {
        linkedin: "https://linkedin.com/in/senelperera",
        website: "https://senelperera.com"
      }
    },
    {
      name: "Yasith Senarath",
      role: "Vice Chairman",
      organization: "IEEE Student Branch of University Of Moratuwa",
      email: "yasithsenarath@ieee.org",
      phone: "0715960336",
      social: {
        linkedin: "https://linkedin.com/in/yasithsenarath",
        twitter: "https://twitter.com/yasithsenarath"
      }
    },
    {
      name: "Malithi Rumalka",
      role: "Assistant Secretary",
      organization: "IEEE Student Branch of University Of Moratuwa",
      email: "malithirumalka@gmail.com",
      phone: "0776536321",
      social: {
        linkedin: "https://linkedin.com/in/malithirumalka"
      }
    }
  ];

  const changeLayout = (newLayout) => {
    if (layout === newLayout) return;
    setIsAnimating(true);
    setTimeout(() => {
      setLayout(newLayout);
      setIsAnimating(false);
    }, 300);
  };

  // Create background particles
  const particles = Array(15).fill(null).map((_, i) => <Particle key={i} index={i} />);

  return (
    <section 
      id="contact" 
      className="py-20 relative overflow-hidden" 
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0a1a24 100%)`,
        minHeight: '100vh'
      }}
    >
      <GlobalStyles />
      
      {/* Dynamic background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {particles}
      </div>
      
      {/* Glowing orb background effect */}
      <div 
        className="absolute top-1/4 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: `radial-gradient(circle, ${COLORS.accent} 0%, transparent 70%)` }}
      />
      
      <div 
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{ background: `radial-gradient(circle, ${COLORS.gradientStart} 0%, transparent 70%)` }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-gradient">Connect With Us</span>
          </h2>
          
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 mx-auto rounded-full"></div>
          
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Have questions about IEEE Student Branch events or want to join our community?
            We're always excited to hear from fellow tech enthusiasts and future engineers!
          </p>
          
          {/* Layout toggle buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={() => changeLayout('default')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                layout === 'default' 
                  ? 'bg-yellow-500 text-gray-900 shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Standard View
            </button>
            <button 
              onClick={() => changeLayout('form-first')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                layout === 'form-first' 
                  ? 'bg-yellow-500 text-gray-900 shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Message First
            </button>
          </div>
        </div>
        
        <div 
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 contact-layout-transition ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {layout === 'default' ? (
            <>
              {/* Contact cards */}
              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {contactData.map((contact, index) => (
                  <ContactCard key={contact.email} {...contact} index={index} />
                ))}
              </div>
              
              {/* Contact form */}
              <div className="lg:col-span-1">
                <ContactForm />
              </div>
            </>
          ) : (
            <>
              {/* Form first layout */}
              <div className="lg:col-span-1">
                <ContactForm />
              </div>
              
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {contactData.map((contact, index) => (
                  <ContactCard key={contact.email} {...contact} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;