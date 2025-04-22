import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Award, ChevronRight } from 'lucide-react';

interface PartnerProps {
  name: string;
  type: string;
  tier: 'main' | 'gold' | 'silver' | 'bronze';
  index: number;
}

const PartnerCard = ({ name, type, tier, index }: PartnerProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Set tier-specific styles
  const getTierStyles = () => {
    switch (tier) {
      case 'main':
        return 'partner-card-main';
      case 'gold':
        return 'partner-card-gold';
      case 'silver':
        return 'partner-card-silver';
      case 'bronze':
        return 'partner-card-bronze';
      default:
        return '';
    }
  };

  const getBadgeText = () => {
    switch (tier) {
      case 'main':
        return 'Main Partner';
      case 'gold':
        return 'Gold';
      case 'silver':
        return 'Silver';
      case 'bronze':
        return 'Bronze';
      default:
        return '';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`partner-card ${getTierStyles()} ${isVisible ? 'partner-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="partner-badge">
        <Award size={14} />
        <span>{getBadgeText()}</span>
      </div>
      
      <div className="partner-logo-container">
        <div className="partner-logo-placeholder">
          <span className="partner-logo-text">{name}</span>
        </div>
      </div>
      
      <div className="partner-content">
        <h3 className="partner-name">{name}</h3>
        <p className="partner-type">{type}</p>
        
        <button className="partner-link">
          <span>Visit website</span>
          <ExternalLink size={14} />
        </button>
      </div>
      
      <div className="partner-glow"></div>
    </div>
  );
};

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

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

  return (
    <section ref={sectionRef} id="partners" className="partners-section">
      <div className="partners-container">
        <div className={`section-heading ${isVisible ? 'slide-in' : ''}`}>
          <span className="heading-tagline">Collaborations</span>
          <h2 className="heading-title">
            Our Valued <span className="text-highlight">Partners</span>
          </h2>
          <div className="heading-underline"></div>
          <p className="section-description">
            We collaborate with industry leaders to provide the best opportunities and resources for our community.
          </p>
        </div>
        
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <PartnerCard
              key={index}
              name={partner.name}
              type={partner.type}
              tier={partner.tier}
              index={index}
            />
          ))}
        </div>

        <div className={`partners-cta ${isVisible ? 'fade-in' : ''}`}>
          <p className="cta-text">Interested in becoming a partner?</p>
          <button className="cta-button">
            <span>Become a Partner</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="decoration-circle circle-1"></div>
      <div className="decoration-circle circle-2"></div>
      <div className="decoration-lines"></div>
      
      <style>{`
        .partners-section {
          padding: 120px 0;
          background-color: #112735;
          position: relative;
          overflow: hidden;
        }
        
        .partners-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        
        .section-heading {
          text-align: center;
          margin-bottom: 64px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.17, 0.67, 0.29, 0.99);
        }
        
        .slide-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .heading-tagline {
          display: inline-block;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
          color: #f1c232;
          margin-bottom: 12px;
        }
        
        .heading-title {
          font-size: 36px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
        }
        
        .text-highlight {
          color: #f1c232;
          position: relative;
        }
        
        .text-highlight::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #f1c232, rgba(241, 194, 50, 0.3));
          border-radius: 2px;
        }
        
        .heading-underline {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #f1c232, rgba(241, 194, 50, 0.3));
          border-radius: 2px;
          margin: 0 auto 20px;
        }
        
        .section-description {
          max-width: 600px;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
          line-height: 1.6;
        }
        
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
          margin-bottom: 64px;
        }
        
        @media (min-width: 640px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .partners-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .partner-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.5s cubic-bezier(0.17, 0.67, 0.29, 0.99);
          display: flex;
          flex-direction: column;
          height: 280px;
        }
        
        .partner-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .partner-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.01),
            rgba(255, 255, 255, 0.05)
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .partner-card:hover {
          transform: translateY(-8px);
        }
        
        .partner-card-main {
          border: 1px solid rgba(241, 194, 50, 0.3);
        }
        
        .partner-card-gold {
          border: 1px solid rgba(241, 194, 50, 0.2);
        }
        
        .partner-card-silver {
          border: 1px solid rgba(192, 192, 192, 0.2);
        }
        
        .partner-card-bronze {
          border: 1px solid rgba(205, 127, 50, 0.2);
        }
        
        .partner-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          position: absolute;
          top: 16px;
          right: 16px;
        }
        
        .partner-card-main .partner-badge {
          background: rgba(241, 194, 50, 0.15);
          color: #f1c232;
        }
        
        .partner-card-gold .partner-badge {
          background: rgba(241, 194, 50, 0.1);
          color: #f1c232;
        }
        
        .partner-card-silver .partner-badge {
          background: rgba(192, 192, 192, 0.1);
          color: #c0c0c0;
        }
        
        .partner-card-bronze .partner-badge {
          background: rgba(205, 127, 50, 0.1);
          color: #cd7f32;
        }
        
        .partner-logo-container {
          width: 100%;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        
        .partner-logo-placeholder {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .partner-card:hover .partner-logo-placeholder {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        
        .partner-logo-text {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(90deg, #fff, #f1c232);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .partner-card-main .partner-logo-text {
          background: linear-gradient(90deg, #f1c232, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .partner-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .partner-name {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        
        .partner-type {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 16px;
        }
        
        .partner-link {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #f1c232;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .partner-link:hover {
          color: #ffffff;
          transform: translateX(4px);
        }
        
        .partner-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: radial-gradient(
            ellipse at top,
            rgba(241, 194, 50, 0.1),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .partner-card:hover .partner-glow {
          opacity: 1;
        }
        
        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        
        .circle-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(241, 194, 50, 0.1) 0%,
            rgba(241, 194, 50, 0) 70%
          );
          top: -150px;
          right: -100px;
        }
        
        .circle-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(
            circle,
            rgba(17, 39, 53, 0.9) 0%,
            rgba(17, 39, 53, 0) 70%
          );
          bottom: -150px;
          left: -100px;
        }
        
        .decoration-lines {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: linear-gradient(to right, rgba(241, 194, 50, 0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(241, 194, 50, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.2;
          pointer-events: none;
        }
        
        .partners-cta {
          text-align: center;
          margin-top: 40px;
          opacity: 0;
          transition: opacity 1s ease 0.5s;
        }
        
        .fade-in {
          opacity: 1;
        }
        
        .cta-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 18px;
          margin-bottom: 16px;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background-color: #f1c232;
          color: #112735;
          font-weight: 600;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(241, 194, 50, 0.3);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(241, 194, 50, 0.4);
        }
        
        .cta-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: all 0.5s ease;
        }
        
        .cta-button:hover::after {
          left: 100%;
        }
        
        @media (max-width: 768px) {
          .partners-section {
            padding: 80px 0;
          }
          
          .heading-title {
            font-size: 28px;
          }
          
          .partners-grid {
            gap: 16px;
          }
          
          .partner-card {
            height: 250px;
          }
          
          .partner-logo-container {
            height: 90px;
            margin-bottom: 16px;
          }
          
          .partner-logo-placeholder {
            width: 90px;
            height: 90px;
          }
          
          .partner-logo-text {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;