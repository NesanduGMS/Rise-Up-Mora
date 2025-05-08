import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  const [activeCircle, setActiveCircle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-rotate circles every 4 seconds
  useEffect(() => {
    setIsVisible(true);
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
    <section className="w-full min-h-screen bg-white relative flex items-center justify-center py-16 overflow-hidden">
      {/* Background texture pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side: Content with staggered text blocks (MOVED FROM RIGHT) */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative">
              {/* Dynamic stacked blocks that move on scroll/active state */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-yellow-500/10 rounded-lg transform -translate-x-6 -translate-y-6"></div>
              <div className="absolute top-0 left-0 w-24 h-24 border-2 border-yellow-500/20 rounded-xl transform translate-x-3 translate-y-3"></div>

              <div className="relative bg-white rounded-xl p-10 shadow-xl">
                <span className="inline-block text-sm uppercase tracking-widest font-semibold text-yellow-600 mb-4">
                  IEEE Student Branch
                </span>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Rise Up <span className="text-yellow-600">Mora</span>
                </h2>

                <div className="h-1 w-16 bg-yellow-500 mb-6"></div>

                <p className="text-gray-700 mb-6">
                  A transformative initiative designed for self-driven
                  undergraduates, bridging the gap between academic knowledge
                  and industry expectations through a comprehensive program of
                  webinars, mock interviews, and interactive workshops.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  {[
                    { label: "Expert Webinars", value: "20+" },
                    { label: "Mock Interviews", value: "100+" },
                    { label: "Success Rate", value: "94%" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="text-2xl font-bold text-yellow-600">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="group relative overflow-hidden px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-xl flex items-center gap-2 transition-all duration-300">
                    <span>Join Our Community</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -left-full group-hover:left-full transition-all duration-700 ease-in-out"></span>
                  </button>

                  <button className="px-8 py-4 border-2 border-gray-200 hover:border-yellow-300 text-gray-700 font-medium rounded-xl transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-900/10 rounded-lg"></div>
              <div className="absolute -bottom-12 -right-12 w-24 h-24 border-2 border-blue-900/10 rounded-xl"></div>
            </div>
          </div>

          {/* Right side: Circular interactive design (MOVED FROM LEFT) */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background decorative circles */}
              {/* Removed the rotating yellow dashed border */}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full border-2 border-yellow-300"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2/3 h-2/3 rounded-full border-2 border-blue-300"></div>
              </div>

              {/* Interactive circles - Positioned to touch the edge of the central circle */}
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveCircle(index)}
                  className={`absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 z-10
                    ${
                      activeCircle === index
                        ? "bg-yellow-500 text-gray-900 scale-110"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-yellow-300"
                    }`}
                  style={{
                    // Position to touch the edge of the central circle
                    // For a 3/4 size circle, the radius is 37.5% of container
                    // For w-16 buttons, account for half button width
                    top: `${50 - 37.5 * Math.sin((2 * Math.PI * index) / 3)}%`,
                    left: `${50 - 37.5 * Math.cos((2 * Math.PI * index) / 3)}%`,
                    transform: `translate(-50%, -50%) ${
                      activeCircle === index ? "scale(1.1)" : "scale(1)"
                    }`,
                    boxShadow:
                      activeCircle === index
                        ? "0 10px 25px rgba(241, 194, 50, 0.4)"
                        : "0 4px 10px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {index + 1}
                </button>
              ))}

              {/* Central circle with dynamic content - Ensuring all text is visible */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-blue-900 to-gray-900 text-white flex items-center justify-center overflow-hidden">
                  <div className="p-5 text-center w-4/5 h-4/5 flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-2">
                      {circleContent[activeCircle].title}
                    </h3>
                    <div className="h-px w-16 bg-yellow-500 mx-auto mb-2"></div>
                    <p className="text-xs text-gray-300 leading-relaxed overflow-y-auto max-h-36">
                      {circleContent[activeCircle].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 text-yellow-50"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.71,105.43,141.1,88.16,205,80.94,281.34,72.28,251.2,68.19,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* Removed the spin animation style since we've removed the rotating element */}
    </section>
  );
};

export default AboutSection;
