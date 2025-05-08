import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Shield } from 'lucide-react';

interface PartnerProps {
  name: string;
  type: string;
  tier: 'main' | 'gold' | 'silver' | 'bronze';
}

const PartnerCard = ({ name, type, tier }: PartnerProps) => {
  // Get colors based on tier
  const getTierColors = () => {
    switch (tier) {
      case 'main':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-300',
          accent: 'text-blue-600',
          icon: 'bg-blue-500'
        };
      case 'gold':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-300',
          accent: 'text-amber-600',
          icon: 'bg-amber-500'
        };
      case 'silver':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          accent: 'text-gray-600',
          icon: 'bg-gray-500'
        };
      case 'bronze':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-300',
          accent: 'text-orange-600',
          icon: 'bg-orange-500'
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          accent: 'text-gray-600',
          icon: 'bg-gray-400'
        };
    }
  };

  const colors = getTierColors();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-xl ${colors.bg} border ${colors.border} p-6 flex flex-col h-full shadow-lg overflow-hidden group`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${colors.icon} text-white shadow-md`}>
          <Shield size={20} />
        </div>
        
        <div className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full border border-gray-200 bg-white">
          {tier === 'main' ? 'Main Partner' : tier}
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{type}</p>
      </div>
      
      <motion.a
        href="#"
        whileHover={{ x: 5 }}
        className={`inline-flex items-center gap-2 ${colors.accent} font-medium mt-4`}
      >
        Visit website <ExternalLink size={16} />
      </motion.a>
    </motion.div>
  );
};

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const partners = [
    {
      name: 'MAS',
      type: 'Main Industrial Partner',
      tier: 'main' as const
    },
    {
      name: 'IFS',
      type: 'Technology Platform Partner',
      tier: 'gold' as const
    },
    {
      name: 'GTN',
      type: 'Enterprise Solutions Partner',
      tier: 'silver' as const
    },
    {
      name: 'SensusHub',
      type: 'Innovation Partner',
      tier: 'bronze' as const
    }
  ];

  const mainPartners = partners.filter(partner => partner.tier === 'main');
  const otherPartners = partners.filter(partner => partner.tier !== 'main');

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative" id="partners">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider inline-block mb-4">Our Collaborations</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by Industry <span className="text-blue-600">Leaders</span>
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We partner with innovative organizations to deliver exceptional experiences and drive industry transformation.
            </p>
          </motion.div>
        </div>

        {/* Main Partners */}
        {mainPartners.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Main Partners</h3>
            <div className="grid grid-cols-1 gap-8">
              {mainPartners.map((partner) => (
                <PartnerCard 
                  key={partner.name}
                  name={partner.name}
                  type={partner.type}
                  tier={partner.tier}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Partners */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Partners & Sponsors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPartners.map((partner) => (
              <PartnerCard 
                key={partner.name}
                name={partner.name}
                type={partner.type}
                tier={partner.tier}
              />
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <a 
              href="#" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Become a Partner
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;