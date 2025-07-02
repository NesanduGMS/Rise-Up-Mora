import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  const [activeCircle, setActiveCircle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  // Auto-rotate circles every 4 seconds
  useEffect(() => {
    setIsVisible(true);
    
    // Trigger animations after initial load
    setTimeout(() => {
      setAnimationTrigger(true);
    }, 300);
    
    const interval = setInterval(() => {
      setActiveCircle((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const circleContent = [
    {
      title: "Who We Are",
      content:
        "Rise Up Mora is a transformative initiative by the IEEE Student Branch at the University of Moratuwa, designed for self-driven undergraduates seeking to bridge the gap between academic knowledge and industry expectations.",
    },
    {
      title: "Our Mission",
      content:
        "Empowering students with practical skills, confidence, and insights needed to excel in technical interviews and thrive in professional environments with guidance from renowned industry experts.",
    },
    {
      title: "Our Impact",
      content:
        "Providing webinars, mock interviews, and interactive workshops that equip participants with personalized feedback and valuable connections for success in industrial training and beyond.",
    },
  ];

  return (
    <section id="about" className="w-full min-h-screen bg-white relative flex items-center justify-center py-24 overflow-hidden">
      {/* Background texture pattern with animation */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`h-full w-full transition-all duration-2000 ${
            animationTrigger ? "scale-110" : "scale-100"
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transition: "transform 20s ease-in-out",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left side: Content with staggered text blocks */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative">
              {/* Animated decorative elements */}
              <div 
                className={`absolute top-0 left-0 w-16 h-16 bg-yellow-500/10 rounded-lg transform -translate-x-6 -translate-y-6 transition-all duration-1000 ${
                  animationTrigger ? "rotate-12" : "rotate-0"
                }`}
              ></div>
              <div 
                className={`absolute top-0 left-0 w-32 h-32 border-2 border-yellow-500/20 rounded-xl transform translate-x-3 translate-y-3 transition-all duration-1500 ${
                  animationTrigger ? "-rotate-6" : "rotate-0"
                }`}
              ></div>

              <div className="relative bg-white rounded-xl p-12 shadow-xl">
                <span className="inline-block text-base uppercase tracking-widest font-semibold text-yellow-600 mb-5">
                  IEEE Student Branch Leadership
                </span>

                <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
                  Rise Up <span className="text-yellow-600 relative">
                    Mora
                    <span className={`absolute -bottom-1 left-0 h-1 bg-yellow-500 transition-all duration-1000 ${
                      animationTrigger ? "w-full" : "w-0"
                    }`}></span>
                  </span>
                </h2>

                <div className={`h-1 w-24 bg-yellow-500 mb-8 transition-all duration-1000 ${
                  animationTrigger ? "opacity-100" : "opacity-0 -translate-x-8"
                }`}></div>

                <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                  Rise Up Mora is a prestigious internship-focused career development initiative launched by the IEEE Student Branch of the University of Moratuwa in 2021. It has quickly become the most awaited internship-oriented experience at Sri Lanka’s leading technological university, highlighted by its flagship <b>Internship and Mock Interview Fair</b>, which connects over 5,000 undergraduates from Sri Lanka’s leading technological university with the top names in the industry. With a strong five-year track record, Rise Up Mora has garnered a solid reputation both within the University of Moratuwa and across the IEEE Student Branch community in Sri Lanka, recognized by several awards for its impact, including the “Best Industry Collaborative Project” at the IEEE Sri Lanka Section Awards 2023.

                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { label: "Expert Webinars", value: "20+" },
                    { label: "Mock Interviews", value: "3500+" },
                    { label: "Success Rate", value: "94%" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className={`text-center p-5 bg-gray-50 rounded-lg transform transition-all duration-700 hover:scale-105 hover:shadow-md ${
                        animationTrigger 
                          ? "opacity-100 translate-y-0" 
                          : "opacity-0 translate-y-12"
                      }`}
                      style={{ transitionDelay: `${300 + idx * 200}ms` }}
                    >
                      <div className="text-3xl font-bold text-yellow-600">
                        {stat.value}
                      </div>
                      <div className="text-base text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6">
                  <button 
                    className={`group relative overflow-hidden px-10 py-5 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-xl flex items-center gap-3 transition-all duration-500 ${
                      animationTrigger ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "900ms" }}
                  >
                    <span className="text-lg">Join Our Community</span>
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -left-full group-hover:left-full transition-all duration-700 ease-in-out"></span>
                  </button>

                  <button 
                    className={`px-10 py-5 border-2 border-gray-200 hover:border-yellow-300 text-gray-700 font-medium rounded-xl transition-all duration-500 text-lg hover:bg-yellow-50 ${
                      animationTrigger ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "1100ms" }}
                  >
                    Learn More
                  </button>
                </div>
              </div>

              {/* Animated decorative elements */}
              <div 
                className={`absolute -bottom-8 -right-8 w-16 h-16 bg-blue-900/10 rounded-lg transition-all duration-1500 ${
                  animationTrigger ? "rotate-12 scale-110" : "rotate-0 scale-100"
                }`}
              ></div>
              <div 
                className={`absolute -bottom-16 -right-16 w-32 h-32 border-2 border-blue-900/10 rounded-xl transition-all duration-2000 ${
                  animationTrigger ? "-rotate-6 scale-110" : "rotate-0 scale-100"
                }`}
              ></div>
            </div>
          </div>

          {/* Right side: Circular interactive design */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="relative w-full aspect-square max-w-xl mx-auto">
              {/* Background decorative circles with animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className={`w-3/4 h-3/4 rounded-full border-2 border-yellow-300 transition-all duration-2000 ${
                    animationTrigger ? "rotate-180 scale-105" : "rotate-0 scale-100"
                  }`}
                  style={{ transition: "transform 20s linear infinite" }}
                ></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className={`w-2/3 h-2/3 rounded-full border-2 border-blue-300 transition-all duration-2000 ${
                    animationTrigger ? "-rotate-180 scale-110" : "rotate-0 scale-100"
                  }`}
                  style={{ transition: "transform 15s linear infinite" }}
                ></div>
              </div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-400"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    opacity: 0.4 + Math.random() * 0.4,
                    animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                ></div>
              ))}

              {/* Interactive circles - Positioned to touch the edge of the central circle */}
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveCircle(index)}
                  className={`absolute w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 z-10 text-lg
                    ${
                      activeCircle === index
                        ? "bg-yellow-500 text-gray-900 scale-110"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-yellow-300"
                    }`}
                  style={{
                    top: `${50 - 37.5 * Math.sin((2 * Math.PI * index) / 3)}%`,
                    left: `${50 - 37.5 * Math.cos((2 * Math.PI * index) / 3)}%`,
                    transform: `translate(-50%, -50%) ${
                      activeCircle === index ? "scale(1.2)" : "scale(1)"
                    }`,
                    boxShadow:
                      activeCircle === index
                        ? "0 10px 30px rgba(241, 194, 50, 0.5)"
                        : "0 4px 15px rgba(0, 0, 0, 0.1)",
                    animation: animationTrigger ? `pulse-${index} 3s infinite ease-in-out` : "none",
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  {index + 1}
                </button>
              ))}

              {/* Central circle with dynamic content - Ensuring all text is visible */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className={`w-3/4 h-3/4 rounded-full bg-gradient-to-br from-blue-900 to-gray-900 text-white flex items-center justify-center overflow-hidden transition-all duration-700 ${
                    animationTrigger ? "scale-100" : "scale-90"
                  }`}
                  style={{
                    boxShadow: "0 10px 40px rgba(30, 58, 138, 0.4)"
                  }}
                >
                  <div 
                    className={`p-6 text-center w-4/5 h-4/5 flex flex-col justify-center transition-opacity duration-300 ${
                      animationTrigger ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-3">
                      {circleContent[activeCircle].title}
                    </h3>
                    <div className={`h-px w-24 bg-yellow-500 mx-auto mb-4 transition-all duration-500 ${
                      animationTrigger ? "w-24" : "w-0"
                    }`}></div>
                    <p className="text-sm text-gray-300 leading-relaxed overflow-y-auto max-h-44">
                      {circleContent[activeCircle].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.2); }
        }
        @keyframes pulse-0 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes pulse-1 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes pulse-2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;