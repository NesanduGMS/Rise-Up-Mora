/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, memo } from 'react';
import { Mail, Phone, Link, ExternalLink, MessageSquare } from 'lucide-react';

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
        background: 'linear-gradient(135deg, #5433FF, #20BDFF, #A5FECB)', 
        borderRadius: '1.5rem',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inner Card */}
      <div
        className="bg-white rounded-3xl p-4 flex flex-col justify-between h-full"
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '1.5rem', 
        }}
      >
        {/* Image Section */}
        <div
          className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-md mx-auto"
          style={{
            backgroundImage: `url('https://via.placeholder.com/150')`, // Replace with actual image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Details Section */}
        <div className="flex flex-col items-center mt-4">
          <h3
            className="text-lg font-bold text-gray-800"
            style={{
              background: 'linear-gradient(90deg, #5433FF, #20BDFF, #A5FECB)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {name}
          </h3>
          <p className="text-sm text-yellow-600 font-medium">{role}</p>
          {organization && <p className="text-xs text-gray-500">{organization}</p>}
        </div>

        {/* Contact Info */}
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">
            <Mail className="inline-block mr-1 text-yellow-500" size={16} />
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </p>
          <p className="text-sm text-gray-600">
            <Phone className="inline-block mr-1 text-yellow-500" size={16} />
            <a href={`tel:${phone}`} className="hover:underline">
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
                className="text-gray-400 hover:text-yellow-500 transition-transform transform hover:scale-110"
              >
                <Link size={18} />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-transform transform hover:scale-110"
              >
                <ExternalLink size={18} />
              </a>
            )}
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-transform transform hover:scale-110"
              >
                <MessageSquare size={18} />
              </a>
            )}
          </div>
        )}
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

    .text-gradient {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(90deg, #5433FF, #20BDFF, #A5FECB);
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
    },
    // Duplicated cards for the second row - should be replaced with actual data
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

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      style={{
        background: '#ffffff', // Set background to white
        minHeight: '100vh'
      }}
    >
      <GlobalStyles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 animate-fade-in"
            style={{
              animation: 'fadeIn 1.5s ease-out, pulse 2s infinite alternate',
            }}
          >
            <span className="text-gradient">Connect With Us</span>
          </h2>

          <div
            className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 mx-auto rounded-full animate-pulse"
            style={{
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
            We're always excited to hear from fellow tech enthusiasts and future engineers!
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 contact-layout-transition ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {contactData.map((contact, index) => (
            <div
              key={`${contact.email}-${index}`}
              className="animate-float"
              style={{
                animation: `float 3s ease-in-out ${index * 0.2}s infinite`,
              }}
            >
              <ContactCard {...contact} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;