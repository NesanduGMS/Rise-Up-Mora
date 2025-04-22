import { useEffect, useRef } from 'react';
import HeroImage from '../assets/Hero.jpg';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const moraLettersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Fade-in and slide-up animations on mount
    const title = titleRef.current;
    const text = textRef.current;
    const button = buttonRef.current;
    
    if (title && text && button) {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
      
      setTimeout(() => {
        text.style.opacity = "1";
        text.style.transform = "translateY(0)";
      }, 300);
      
      setTimeout(() => {
        button.style.opacity = "1";
        button.style.transform = "translateY(0)";
      }, 600);
    }

    // Mora animation
    const moraLetters = moraLettersRef.current;
    if (moraLetters.length) {
      moraLetters.forEach((letter, index) => {
        setTimeout(() => {
          letter.style.opacity = "1";
          letter.style.transform = "translateY(0) rotate(0deg)";
        }, 800 + (index * 150));
      });
    }
  }, []);

  // Store mora letter refs
  const setMoraRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      moraLettersRef.current[index] = el;
    }
  };

  return (
    <div 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(17, 39, 53, 0.6), rgba(17, 39, 53, 0.5)), url(${HeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Glass morphism card */}
      <div className="glass-card absolute right-0 top-1/4 w-64 h-64 md:w-96 md:h-96"></div>
      <div className="glass-card absolute left-0 bottom-1/4 w-48 h-48 md:w-72 md:h-72"></div>
      
      {/* Animated shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Animated lines */}
      <div className="lines-container">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 relative">
        <div className="backdrop-blur-sm bg-dark-blue bg-opacity-20 p-8 md:p-12 rounded-xl border border-gold border-opacity-20">
          <div className="flex flex-col items-center text-center">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-6xl font-bold mb-6 opacity-0 transform translate-y-8 transition-all duration-700 text-white"
            >
              Welcome to <span className="text-gold">Rise Up</span>
            </h1>
            
            {/* MORA Animated Text */}
            <div className="flex justify-center mb-10 perspective">
              {'MORA'.split('').map((letter, index) => (
                <div 
                  key={index}
                  ref={(el) => setMoraRef(el, index)}
                  className="text-5xl md:text-7xl font-extrabold text-gold mx-1 md:mx-2 opacity-0 transform translate-y-8 rotate-12 transition-all duration-700 hover:scale-110 mora-letter"
                  style={{ 
                    textShadow: '3px 3px 0px rgba(17, 39, 53, 0.5)',
                    transitionDelay: `${index * 0.15}s`
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            
            <p 
              ref={textRef}
              className="text-lg max-w-2xl text-white mb-8 opacity-0 transform translate-y-8 transition-all duration-700 delay-300 text-shadow"
            >
              A transformative initiative by the IEEE Student Branch at the University of Moratuwa.
              Designed for self-driven undergraduates, offering webinars, mock interviews, and
              workshops to enhance skills and interview performance.
            </p>
            <button 
              ref={buttonRef}
              className="bg-gold text-dark-blue px-8 py-4 rounded-full font-semibold transition duration-300 
              shadow-lg hover:shadow-xl transform hover:-translate-y-1 opacity-0 translate-y-8 relative overflow-hidden button-shine"
            >
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated Wave effect at bottom */}
      <div className="absolute bottom-0 left-0 w-full wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#f1c232" fillOpacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,170.7C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Additional wave for layered effect */}
      <div className="absolute bottom-0 left-0 w-full wave-container-alt">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full translate-y-6">
          <path fill="#112735" fillOpacity="0.6" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      <style>{`
        .text-gold {
          color: #f1c232;
        }
        
        .text-dark-blue {
          color: #112735;
        }
        
        .bg-gold {
          background-color: #f1c232;
        }
        
        .bg-dark-blue {
          background-color: #112735;
        }
        
        .border-gold {
          border-color: #f1c232;
        }
        
        .text-shadow {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        .perspective {
          perspective: 1000px;
        }
        
        .mora-letter {
          transition: all 0.3s ease;
          transform-style: preserve-3d;
        }
        
        .mora-letter:hover {
          transform: rotateY(20deg) translateY(-5px);
          text-shadow: 6px 3px 0px rgba(17, 39, 53, 0.3);
        }
        
        .glass-card {
          background: rgba(241, 194, 50, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          border: 1px solid rgba(241, 194, 50, 0.2);
          animation: morphing 15s infinite;
          z-index: 0;
        }
        
        @keyframes morphing {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
        
        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
        }
        
        .shape-1 {
          width: 300px;
          height: 300px;
          background-color: #f1c232;
          top: -100px;
          right: 10%;
          animation: float 20s ease-in-out infinite;
        }
        
        .shape-2 {
          width: 200px;
          height: 200px;
          background-color: #f1c232;
          bottom: 10%;
          left: 5%;
          animation: float 15s ease-in-out infinite reverse;
        }
        
        .shape-3 {
          width: 150px;
          height: 150px;
          background-color: #f1c232;
          top: 30%;
          left: 15%;
          animation: float 18s ease-in-out infinite 2s;
        }
        
        .lines-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        
        .line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(241, 194, 50, 0.2), transparent);
          animation: moveLine 8s linear infinite;
        }
        
        .line-1 {
          top: 20%;
          animation-delay: 0s;
        }
        
        .line-2 {
          top: 50%;
          animation-delay: 2s;
        }
        
        .line-3 {
          top: 80%;
          animation-delay: 4s;
        }
        
        @keyframes moveLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .button-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-25deg);
          transition: all 0.75s ease;
        }
        
        .button-shine:hover::before {
          left: 150%;
        }
        
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #f1c232;
          border-radius: 50%;
          opacity: 0.4;
          box-shadow: 0 0 10px 2px rgba(241, 194, 50, 0.3);
          animation: particleFloat 40s infinite linear;
        }
        
        .particle:nth-child(1) { top: 20%; left: 10%; animation: particleFloat 30s infinite linear; width: 5px; height: 5px; }
        .particle:nth-child(2) { top: 70%; left: 20%; animation: particleFloat 25s infinite linear 2s; width: 3px; height: 3px; }
        .particle:nth-child(3) { top: 40%; left: 30%; animation: particleFloat 35s infinite linear 1s; width: 6px; height: 6px; }
        .particle:nth-child(4) { top: 60%; left: 40%; animation: particleFloat 22s infinite linear 3s; width: 4px; height: 4px; }
        .particle:nth-child(5) { top: 30%; left: 50%; animation: particleFloat 28s infinite linear 2s; width: 5px; height: 5px; }
        .particle:nth-child(6) { top: 80%; left: 60%; animation: particleFloat 32s infinite linear; width: 3px; height: 3px; }
        .particle:nth-child(7) { top: 50%; left: 70%; animation: particleFloat 26s infinite linear 4s; width: 4px; height: 4px; }
        .particle:nth-child(8) { top: 10%; left: 80%; animation: particleFloat 33s infinite linear 1s; width: 6px; height: 6px; }
        .particle:nth-child(9) { top: 45%; left: 90%; animation: particleFloat 29s infinite linear 2s; width: 3px; height: 3px; }
        .particle:nth-child(10) { top: 75%; left: 95%; animation: particleFloat 31s infinite linear; width: 5px; height: 5px; }
        .particle:nth-child(11) { top: 15%; left: 25%; animation: particleFloat 27s infinite linear 5s; width: 4px; height: 4px; }
        .particle:nth-child(12) { top: 85%; left: 35%; animation: particleFloat 34s infinite linear 3s; width: 6px; height: 6px; }
        .particle:nth-child(13) { top: 55%; left: 65%; animation: particleFloat 24s infinite linear 2s; width: 3px; height: 3px; }
        .particle:nth-child(14) { top: 5%; left: 75%; animation: particleFloat 36s infinite linear 4s; width: 5px; height: 5px; }
        .particle:nth-child(15) { top: 95%; left: 85%; animation: particleFloat 28s infinite linear 1s; width: 4px; height: 4px; }
        
        .wave-container {
          animation: wave-animation 10s linear infinite alternate;
        }
        
        .wave-container-alt {
          animation: wave-animation 15s linear infinite alternate-reverse;
        }
        
        @keyframes wave-animation {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(50px); }
        }
        
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, 15px) rotate(5deg); }
          50% { transform: translate(5px, 10px) rotate(0deg); }
          75% { transform: translate(-5px, 15px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes particleFloat {
          0% { transform: translate(0, 0); }
          25% { transform: translate(100px, 50px); }
          50% { transform: translate(0, 100px); }
          75% { transform: translate(-100px, 50px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
};

export default Hero;