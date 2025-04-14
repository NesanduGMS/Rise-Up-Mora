import React from 'react';

const Hero = () => {
  return (
    <div id="home" className="pt-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to Rise Up Mora
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A transformative initiative by the IEEE Student Branch at the University of Moratuwa.
              Designed for self-driven undergraduates, offering webinars, mock interviews, and
              workshops to enhance skills and interview performance.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 
              transition duration-300">
              Get Started
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="Students collaborating"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;