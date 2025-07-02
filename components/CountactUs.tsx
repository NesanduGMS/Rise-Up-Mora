import { useState, memo } from 'react';
import { Mail, Phone, Link, ExternalLink, MessageSquare, Users, Award } from 'lucide-react';
import Image from "next/image";

interface ContactCardProps {
  name: string;
  role: string;
  organization?: string;
  email: string;
  phone: string;
  image: string; // This prop will be used
  social?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
  index: number;
  category: 'chair' | 'event';
}

const ContactCard = memo(function ContactCard({ name, role, organization, email, phone, image, social, index, category }: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={`contact-card-${index}`}
      className={`relative p-0.5 rounded-3xl shadow-lg transform transition-all duration-500 ${
        isHovered ? 'scale-105 shadow-2xl' : ''
      }`}
      style={{
        height: '420px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        background: category === 'chair' 
          ? 'linear-gradient(135deg, #0a1c27, #134e6f, #2a6f97)' 
          : 'linear-gradient(135deg, #0a1c27, #f3c03e, #ffd166)',
        borderRadius: '1.5rem',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inner Card */}
      <div
        className="bg-white rounded-3xl p-4 flex flex-col justify-between h-full w-full"
        style={{
          borderRadius: '1.4rem', 
        }}
      >
        {/* Icon Badge */}
        <div className="absolute -top-3 right-4 bg-yellow-400 rounded-full p-2 shadow-lg">
          {category === 'chair' ? 
            <Award size={16} className="text-gray-900" /> : 
            <Users size={16} className="text-gray-900" />
          }
        </div>

        {/* Image Section */}
        <div
          className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden shadow-md mx-auto border-2" // Increased size from w-36 h-36
          style={{
            backgroundImage: `url(${image})`, // Use the image prop here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderColor: category === 'chair' ? '#0a1c27' : '#f3c03e',
          }}
        ></div>

        {/* Details Section */}
        <div className="flex flex-col items-center mt-4">
          <h3
            className="text-lg font-bold"
            style={{
              background: category === 'chair' 
                ? 'linear-gradient(90deg, #0a1c27, #134e6f, #2a6f97)'
                : 'linear-gradient(90deg, #0a1c27, #f3c03e, #ffd166)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {name}
          </h3>
          <p className="text-sm font-medium" style={{ color: '#0a1c27' }}>{role}</p>
          {organization && <p className="text-xs text-gray-500">{organization}</p>}
        </div>

        {/* Contact Info */}
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">
            <Mail className="inline-block mr-1 text-yellow-400" size={16} />
            <a href={`mailto:${email}`} className="hover:underline hover:text-yellow-500">
              {email}
            </a>
          </p>
          <p className="text-sm text-gray-600">
            <Phone className="inline-block mr-1 text-yellow-400" size={16} />
            <a href={`tel:${phone}`} className="hover:underline hover:text-yellow-500">
              {phone}
            </a>
          </p>
        </div>

        {/* Social Links at the Bottom */}
        {social && (
          <div className="flex space-x-4 mt-4 justify-center">
            {social.website && (
              <a
                href={social.website}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-transform transform hover:scale-110"
              >
                <Link size={18} />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-transform transform hover:scale-110"
              >
                <ExternalLink size={18} />
              </a>
            )}
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-transform transform hover:scale-110"
              >
                <MessageSquare size={18} />
              </a>
            )}
          </div>
        )}

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-3xl overflow-hidden">
          <div 
            className="h-full animate-shimmer" 
            style={{
              background: category === 'chair' 
                ? 'linear-gradient(90deg, #0a1c27, #134e6f, #2a6f97, #0a1c27)' 
                : 'linear-gradient(90deg, #0a1c27, #f3c03e, #ffd166, #0a1c27)',
              backgroundSize: '200% 100%',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
});

// Global CSS styles enhancement
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes shimmer {
      0% { background-position: 0% 0; }
      100% { background-position: 200% 0; }
    }

    .animate-fade-in {
      animation: fadeIn 1s ease-out;
    }

    .animate-slide-up {
      animation: slideUp 1s ease-out;
    }

    .animate-pulse {
      animation: pulse 2s infinite;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-shimmer {
      animation: shimmer 3s infinite linear;
    }

    .text-gradient-blue {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(90deg, #0a1c27, #134e6f, #2a6f97);
    }
    
    .text-gradient-yellow {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(90deg, #0a1c27, #f3c03e, #ffd166);
    }
    
    .section-divider {
      height: 3px;
      background: linear-gradient(90deg, transparent, #0a1c27, transparent);
      margin: 2rem auto;
      width: 80%;
      border-radius: 9999px;
      opacity: 0.3;
    }
    
    .card-grid {
      transition: all 0.5s ease-out;
    }
  `}</style>
);

const EnhancedContact = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Contact card data reorganized into chairs and event chairs
  const chairpersons = [
    {
      name: "Sanjula Gathsara",
      image: "/contactUsImages/Sanjula.jpg",
      role: "Chairman",
      organization: "IEEE Student Branch of University Of Moratuwa",
      email: "sanjulagathsara@ieee.org",
      phone: "+94 77 729 9792",
      social: {
        linkedin: "https://www.linkedin.com/in/sanjula-gathsara/",
      },
      category: 'chair'
    },
    {
      name: "Nivishka Manchanayake",
      image: "/contactUsImages/Nivishka.jpg",
      role: "Vice Chairman",
      organization: "IEEE Student Branch of University Of Moratuwa",
      email: "nivishkamanchanayake@ieee.org",
      phone: "+94 70 426 7365",
      social: {
        linkedin: "https://www.linkedin.com/in/nivishka-manchanayake-381870240/",
      },
      category: 'chair'
    }
  ];
  
  const eventChairpersons = [
    {
      name: "Chanuka Anjana",
      image: "/contactUsImages/Chanuka.jpg",
      role: "Event Chairperson",
      organization: "IEEE Student Branch of University of Moratuwa",
      email: "chanukaanjana01@gmail.com",
      phone: "+94 71 760 7248",
      social: {
        linkedin: "https://linkedin.com/"
      },
      category: 'event'
    },
    {
      name: "Praveesha De Silva",
      image: "/contactUsImages/Praveesha.jpg",
      role: "Event Vice Chairperson",
      organization: "IEEE Student Branch of University of Moratuwa",
      email: "praveeshadesilva@gmail.com",
      phone: "+94 76 286 4219",
      social: {
        linkedin: "https://www.linkedin.com/in/praveesha-de-silva-2a43a9277/",
      },
      category: 'event'
    },
    {
      name: "Gishan Bandara",
      image: "/contactUsImages/Gishan.jpg",
      role: "Event Vice Chairperson",
      organization: "IEEE Student Branch of University of Moratuwa",
      email: "gishanchamith77@gmail.com",
      phone: "+94 76 351 0388",
      social: {
        linkedin: "https://linkedin.com/",
      },
      category: 'event'
    }
  ];

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      style={{
        background: '#ffffff', // White background as requested
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <GlobalStyles />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-5" 
          style={{ background: '#0a1c27', filter: 'blur(40px)' }}></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-5" 
          style={{ background: '#f3c03e', filter: 'blur(60px)' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in"
            style={{
              color: '#0a1c27',
              animation: 'fadeIn 1.5s ease-out',
            }}
          >
            Connect With <span className="text-yellow-400">IEEE Leadership</span>
          </h2>

          <div
            className="h-1 w-24 mx-auto rounded-full animate-pulse"
            style={{
              background: 'linear-gradient(90deg, #0a1c27, #f3c03e)',
              animation: 'pulse 2s infinite',
            }}
          ></div>

          <p
            className="text-gray-600 mt-6 max-w-2xl mx-auto animate-slide-up"
            style={{
              animation: 'slideUp 1.5s ease-out',
            }}
          >
            Have questions about IEEE Student Branch events or want to join our community?
            We&apos;re always excited to hear from fellow tech enthusiasts and future engineers!
          </p>
        </div>

        {/* Chairpersons Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-center mb-8" style={{ color: '#0a1c27' }}>
            <span className="inline-block border-b-2 border-yellow-400 pb-2">IEEE Student Branch</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 card-grid">
            {chairpersons.map((contact, index) => (
              <div
                key={`chair-${index}`}
                className="mx-auto animate-float"
                style={{
                  animation: `float 3s ease-in-out ${index * 0.2}s infinite`,
                  maxWidth: '340px',
                  width: '100%'
                }}
              >
                <ContactCard {...contact} index={index} category="chair" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="section-divider"></div>

        {/* Event Chairpersons Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center mb-8" style={{ color: '#0a1c27' }}>
            <span className="inline-block border-b-2 border-yellow-400 pb-2">Event Coordination Team</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 card-grid">
            {eventChairpersons.map((contact, index) => (
              <div
                key={`event-${index}`}
                className="mx-auto animate-float"
                style={{
                  animation: `float 3s ease-in-out ${(index + 2) * 0.2}s infinite`,
                  maxWidth: '340px',
                  width: '100%'
                }}
              >
                <ContactCard {...contact} index={index} category="event" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-300 p-0.5 rounded-lg transform transition-transform hover:scale-105">
            {/* <button 
              className="bg-white px-8 py-3 rounded-lg font-medium" 
              style={{ color: '#0a1c27' }}
            >
              Join IEEE Today
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;