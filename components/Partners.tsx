import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Shield, Star, Zap, Award, Gem } from 'lucide-react';

interface PartnerProps {
  name: string;
  type: string;
  tier: 'main' | 'gold' | 'silver' | 'bronze';
  logo: string; // URL to company logo
}

const PartnerCard = ({ name, type, tier, logo }: PartnerProps) => {
  // Get colors and icons based on tier
  const getTierStyles = () => {
    switch (tier) {
      case 'main':
        return {
          bg: 'bg-[#112735]',
          border: 'border-yellow-400',
          accent: 'text-yellow-400',
          icon: 'bg-yellow-400 text-[#112735]',
          decoration: <Star className="absolute w-5 h-5 text-yellow-400" />
        };
      case 'gold':
        return {
          bg: 'bg-[#112735]',
          border: 'border-amber-400',
          accent: 'text-amber-400',
          icon: 'bg-amber-400 text-[#112735]',
          decoration: <Award className="absolute w-5 h-5 text-amber-400" />
        };
      case 'silver':
        return {
          bg: 'bg-[#112735]',
          border: 'border-gray-300',
          accent: 'text-gray-300',
          icon: 'bg-gray-300 text-[#112735]',
          decoration: <Gem className="absolute w-5 h-5 text-gray-300" />
        };
      case 'bronze':
        return {
          bg: 'bg-[#112735]',
          border: 'border-orange-300',
          accent: 'text-orange-300',
          icon: 'bg-orange-300 text-[#112735]',
          decoration: <Zap className="absolute w-5 h-5 text-orange-300" />
        };
      default:
        return {
          bg: 'bg-[#112735]',
          border: 'border-gray-400',
          accent: 'text-gray-400',
          icon: 'bg-gray-400 text-[#112735]',
          decoration: <Shield className="absolute w-5 h-5 text-gray-400" />
        };
    }
  };

  const styles = getTierStyles();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 40, rotateY: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
      whileHover={{ y: -10, boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.3)` }}
      className={`relative rounded-xl ${styles.bg} border-2 ${styles.border} p-6 flex flex-col h-full shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300`}
    >
      {/* Floating particles */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, 20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className={`absolute w-1 h-1 rounded-full ${styles.accent}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>
      
      {/* Tier decoration */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="absolute top-4 right-4"
      >
        {styles.decoration}
      </motion.div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 p-2"
        >
          <div className="relative w-full h-full">
            <img
              src={logo}
              alt={`${name} logo`}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              className="filter brightness-0 invert"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gray-600 bg-[#0a1c27] text-gray-200"
        >
          {tier === 'main' ? 'Main Partner' : `${tier} Partner`}
        </motion.div>
      </div>
      
      <div className="flex-grow relative z-10">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold mb-2 text-white"
        >
          {name}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-gray-300 mb-4"
        >
          {type}
        </motion.p>
      </div>
      
      <motion.a
        href="#"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        whileHover={{ x: 5, color: styles.accent }}
        className={`inline-flex items-center gap-2 ${styles.accent} font-medium mt-4 relative z-10`}
      >
        Visit website 
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ExternalLink size={16} />
        </motion.span>
      </motion.a>
      
      {/* Hover effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
      />
    </motion.div>
  );
};

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const partners = [
    {
      name: '', // Name removed
      type: 'Main Industrial Partner',
      tier: 'main' as const,
      logo: '/logos/mas-logo.png' 
    },
    {
      name: '', // Name removed
      type: 'Technology Platform Partner',
      tier: 'gold' as const,
      logo: '/logos/ifs-logo.png'
    },
    {
      name: '', // Name removed
      type: 'Enterprise Solutions Partner',
      tier: 'silver' as const,
      logo: '/logos/gtn-logo.png'
    },
    {
      name: '', // Name removed
      type: 'Innovation Partner',
      tier: 'bronze' as const,
      logo: '/logos/sensushub-logo.png'
    }
  ];

  const mainPartners = partners.filter(partner => partner.tier === 'main');
  const otherPartners = partners.filter(partner => partner.tier !== 'main');

  return (
    <section className="py-24 bg-[#0a1c27] overflow-hidden relative" id="partners">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: '-50%', y: '-50%' }}
          animate={isInView ? { opacity: 0.05 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 w-[120%] h-[120%]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'moveBackground 100s linear infinite'
          }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : {}}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span 
              className="bg-yellow-400/10 text-yellow-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider inline-block mb-4 border border-yellow-400/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Alliances
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl font-bold text-white mb-6"
            >
              Our <span className="text-yellow-400">Valued</span> Partners
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full origin-left"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-gray-300 text-lg max-w-2xl mx-auto"
            >
              Collaborating with industry pioneers to drive innovation and deliver exceptional value.
            </motion.p>
          </motion.div>
        </div>

        {/* Main Partners */}
        {mainPartners.length > 0 && (
          <div className="mb-16">
            <motion.h3 
              className="text-xl font-semibold text-yellow-400 mb-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              Premier Partners
            </motion.h3>
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              {mainPartners.map((partner) => (
                <PartnerCard 
                  key={partner.name}
                  name={partner.name}
                  type={partner.type}
                  tier={partner.tier}
                  logo={partner.logo}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Partners */}
        <div>
          <motion.h3
            className="text-xl font-semibold text-yellow-400 mb-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            Alliance Network
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <PartnerCard 
                  name={partner.name}
                  type={partner.type}
                  tier={partner.tier}
                  logo={partner.logo}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-block"
          >
            <motion.a 
              href="#"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 25px -5px rgba(255, 215, 0, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#112735] px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
            >
              Join Our Network
              <motion.span
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @keyframes moveBackground {
          from { background-position: 0 0; }
          to { background-position: 1000px 1000px; }
        }
      `}</style>
    </section>
  );
};

export default Partners;