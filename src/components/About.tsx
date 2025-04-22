import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
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

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className={`section-heading ${isVisible ? 'slide-in' : ''}`}>
            <span className="heading-tagline">Who We Are</span>
            <h2 className="heading-title">
              Empowering Undergraduates for <span className="text-highlight">Industry Excellence</span>
            </h2>
            <div className="heading-underline"></div>
          </div>
          
          <div className={`about-description ${isVisible ? 'fade-in' : ''}`}>
            <p>
              Rise Up Mora is a transformative initiative by the IEEE Student Branch at the University of Moratuwa. 
              Designed for self-driven undergraduates, we bridge the gap between academic knowledge and industry expectations 
              through a comprehensive program of webinars, mock interviews, and interactive workshops.
            </p>
            <p>
              Our mission is to equip students with the practical skills, confidence, and insights needed to excel 
              in technical interviews and thrive in professional environments. With guidance from renowned industry experts, 
              participants receive personalized feedback and valuable connections that empower them for success in 
              industrial training and beyond.
            </p>
            
            <div className="cta-container">
              <button className="learn-more-btn">
                Join Our Community
                <ArrowRight className="btn-icon" size={18} />
                <span className="btn-glow"></span>
              </button>
            </div>
          </div>
        </div>
        
        <div className={`about-image-container ${isVisible ? 'scale-in' : ''}`}>
          <div className="image-frame">
            <div className="image-overlay"></div>
            <div className="image-placeholder">
              <div className="animated-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
              </div>
            </div>
          </div>
          <div className="image-decoration"></div>
          <div className="blue-blob"></div>
          <div className="gold-blob"></div>
        </div>
      </div>
      
      <style jsx>{`
        .about-section {
          padding: 120px 0;
          background: linear-gradient(180deg, #0f2130 0%, #112735 100%);
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        
        .about-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(241, 194, 50, 0.03) 0%, transparent 30%),
            radial-gradient(circle at 90% 80%, rgba(241, 194, 50, 0.03) 0%, transparent 30%);
          pointer-events: none;
        }
        
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
          position: relative;
          z-index: 1;
        }
        
        @media (min-width: 992px) {
          .about-container {
            grid-template-columns: 3fr 2fr;
            align-items: center;
          }
        }
        
        .about-content {
          position: relative;
        }
        
        .section-heading {
          margin-bottom: 40px;
          opacity: 0;
          transform: translateX(-50px);
          transition: all 1s cubic-bezier(0.17, 0.67, 0.29, 0.99);
        }
        
        .slide-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .heading-tagline {
          display: inline-block;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
          color: #f1c232;
          margin-bottom: 12px;
          position: relative;
          padding-left: 24px;
        }
        
        .heading-tagline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 16px;
          height: 2px;
          background-color: #f1c232;
          transform: translateY(-50%);
        }
        
        .heading-title {
          font-size: 36px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        
        .text-highlight {
          color: #f1c232;
          position: relative;
          display: inline-block;
        }
        
        .text-highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #f1c232, rgba(241, 194, 50, 0.3));
          border-radius: 2px;
        }
        
        .heading-underline {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #f1c232, rgba(241, 194, 50, 0.3));
          border-radius: 2px;
        }
        
        .about-description {
          margin-bottom: 48px;
          opacity: 0;
          transition: opacity 1s ease 0.5s;
        }
        
        .fade-in {
          opacity: 1;
        }
        
        .about-description p {
          color: rgba(255, 255, 255, 0.85);
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        
        .cta-container {
          margin-top: 32px;
        }
        
        .learn-more-btn {
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
        
        .learn-more-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(241, 194, 50, 0.4);
        }
        
        .btn-icon {
          transition: transform 0.3s ease;
        }
        
        .learn-more-btn:hover .btn-icon {
          transform: translateX(4px);
        }
        
        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: all 0.5s ease;
        }
        
        .learn-more-btn:hover .btn-glow {
          left: 100%;
        }
        
        .about-image-container {
          position: relative;
          transform: scale(0.95);
          opacity: 0;
          transition: all 1s cubic-bezier(0.17, 0.67, 0.29, 0.99) 0.7s;
        }
        
        .scale-in {
          transform: scale(1);
          opacity: 1;
        }
        
        .image-frame {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
          z-index: 1;
        }
        
        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(241, 194, 50, 0.2) 0%, rgba(17, 39, 53, 0.6) 100%);
          z-index: 1;
        }
        
        .image-placeholder {
          position: absolute;
          inset: 0;
          background-color: #182e3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .animated-circles {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.7;
        }
        
        .circle-1 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(241, 194, 50, 0.5) 0%, rgba(241, 194, 50, 0) 70%);
          top: 30%;
          left: 20%;
          animation: float 8s infinite ease-in-out;
        }
        
        .circle-2 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(241, 194, 50, 0.3) 0%, rgba(241, 194, 50, 0) 70%);
          bottom: 10%;
          right: 15%;
          animation: float 12s infinite ease-in-out 1s;
        }
        
        .circle-3 {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
          top: 20%;
          right: 25%;
          animation: float 10s infinite ease-in-out 2s;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(15px, -15px); }
          50% { transform: translate(-10px, 10px); }
          75% { transform: translate(5px, -5px); }
        }
        
        .image-decoration {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 140px;
          height: 140px;
          border: 2px dashed rgba(241, 194, 50, 0.5);
          border-radius: 20px;
          z-index: 0;
        }
        
        .blue-blob {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(17, 39, 53, 0.9) 0%, rgba(17, 39, 53, 0) 70%);
          border-radius: 50%;
          top: -100px;
          right: -100px;
          z-index: -1;
          filter: blur(40px);
          animation: slow-pulse 15s infinite alternate;
        }
        
        .gold-blob {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(241, 194, 50, 0.2) 0%, rgba(241, 194, 50, 0) 70%);
          border-radius: 50%;
          bottom: -80px;
          left: -80px;
          z-index: -1;
          filter: blur(40px);
          animation: slow-pulse 10s infinite alternate-reverse;
        }
        
        @keyframes slow-pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.3);
            opacity: 0.2;
          }
        }
        
        @media (max-width: 768px) {
          .about-section { padding: 80px 0; }
          .heading-title { font-size: 28px; }
          .image-frame { height: 300px; margin-top: 40px; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;