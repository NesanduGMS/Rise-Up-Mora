import React, { useEffect, useRef } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  index: number;
}

const TimelineEvent = ({ date, title, description, index }: TimelineEventProps) => {
  const eventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          eventRef.current?.classList.add('animate-in');
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = eventRef.current;
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
    <div 
      ref={eventRef}
      className={`timeline-event opacity-0 translate-y-8 ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div className="timeline-connector">
        <div className="timeline-dot">
          <Calendar size={20} className="timeline-icon" />
        </div>
      </div>
      <div className="timeline-card">
        <div className="timeline-date">{date}</div>
        <h3 className="timeline-title">{title}</h3>
        <p className="timeline-description">{description}</p>
        <button className="timeline-button">
          Learn more <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Timeline = () => {
  const events = [
    {
      date: "August 27th, 2024",
      time: "3:00 PM",
      title: "Session 01 BY MAS",
      description: "LinkedIn profile creation and maintenance. Learn how to showcase your skills and experience effectively."
    },
    {
      date: "September 3rd, 2024",
      time: "6:00 PM",
      title: "Session 02 BY IFS",
      description: "Excelling in CV writing. Craft a compelling resume that captures attention and highlights your strengths."
    },
    {
      date: "September 10th, 2024",
      time: "6:00 PM",
      title: "Session 03 BY IFS",
      description: "How to face an Interview. Master the art of presenting yourself confidently and answering questions effectively."
    },
    {
      date: "September 17th, 2024",
      time: "4:00 PM",
      title: "Session 04 BY WSO2",
      description: "Technical interview preparation. Practice solving common coding problems and system design challenges."
    },
    {
      date: "September 24th, 2024",
      time: "5:00 PM",
      title: "Session 05 BY VIRTUSA",
      description: "Industry networking event. Connect with professionals and learn about opportunities in the tech industry."
    }
  ];

  return (
    <section id="timeline" className="timeline-section">
      <div className="timeline-container">
        <div className="timeline-header">
          <span className="timeline-tagline">Our Journey</span>
          <h2 className="timeline-heading">
            Event <span className="text-highlight">Timeline</span>
          </h2>
          <div className="heading-underline"></div>
        </div>
        
        <div className="timeline-wrapper">
          <div className="timeline-track"></div>
          {events.map((event, index) => (
            <TimelineEvent
              key={index}
              date={`${event.time} - ${event.date}`}
              title={event.title}
              description={event.description}
              index={index}
            />
          ))}
        </div>
      </div>
      
      <div className="timeline-blob blob-1"></div>
      <div className="timeline-blob blob-2"></div>
      
      <style>{`
        .timeline-section {
          padding: 120px 0;
          background-color: #112735;
          position: relative;
          overflow: hidden;
        }
        
        .timeline-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        
        .timeline-header {
          text-align: center;
          margin-bottom: 64px;
        }
        
        .timeline-tagline {
          display: inline-block;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
          color: #f1c232;
          margin-bottom: 16px;
          position: relative;
          padding: 0 24px;
        }
        
        .timeline-tagline::before,
        .timeline-tagline::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 16px;
          height: 2px;
          background-color: #f1c232;
          transform: translateY(-50%);
        }
        
        .timeline-tagline::before {
          left: 0;
        }
        
        .timeline-tagline::after {
          right: 0;
        }
        
        .timeline-heading {
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
          margin: 0 auto;
        }
        
        .timeline-wrapper {
          position: relative;
          padding: 32px 0;
        }
        
        .timeline-track {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 3px;
          background: linear-gradient(to bottom, rgba(241, 194, 50, 0.1), #f1c232, rgba(241, 194, 50, 0.1));
          transform: translateX(-50%);
        }
        
        .timeline-event {
          position: relative;
          display: flex;
          margin-bottom: 64px;
          transition: all 0.8s cubic-bezier(0.17, 0.67, 0.29, 0.99);
        }
        
        .timeline-left {
          justify-content: flex-end;
          padding-right: calc(50% + 32px);
        }
        
        .timeline-right {
          justify-content: flex-start;
          padding-left: calc(50% + 32px);
        }
        
        .timeline-connector {
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
        
        .timeline-dot {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #112735, #1a3d54);
          border: 3px solid #f1c232;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(241, 194, 50, 0.5);
          transition: all 0.3s ease;
        }
        
        .timeline-icon {
          color: #f1c232;
        }
        
        .timeline-card {
          max-width: 450px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(241, 194, 50, 0.1);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .timeline-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, rgba(241, 194, 50, 0.15), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .timeline-card:hover::before {
          opacity: 1;
        }
        
        .timeline-left .timeline-card::after,
        .timeline-right .timeline-card::after {
          content: '';
          position: absolute;
          top: 24px;
          width: 16px;
          height: 16px;
          transform: rotate(45deg);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.05));
          border: 1px solid rgba(241, 194, 50, 0.1);
        }
        
        .timeline-left .timeline-card::after {
          right: -8px;
          border-right: 1px solid rgba(241, 194, 50, 0.3);
          border-top: 1px solid rgba(241, 194, 50, 0.3);
          border-left: 0;
          border-bottom: 0;
        }
        
        .timeline-right .timeline-card::after {
          left: -8px;
          border-left: 1px solid rgba(241, 194, 50, 0.3);
          border-bottom: 1px solid rgba(241, 194, 50, 0.3);
          border-right: 0;
          border-top: 0;
        }
        
        .timeline-date {
          display: inline-block;
          font-size: 14px;
          font-weight: 500;
          color: #f1c232;
          margin-bottom: 8px;
          padding: 4px 10px;
          background: rgba(241, 194, 50, 0.1);
          border-radius: 20px;
        }
        
        .timeline-title {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }
        
        .timeline-description {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
        }
        
        .timeline-button {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          font-weight: 600;
          color: #f1c232;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .timeline-button:hover {
          color: #ffffff;
          transform: translateX(4px);
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline-event:hover .timeline-dot {
          transform: scale(1.1);
          box-shadow: 0 0 24px rgba(241, 194, 50, 0.7);
        }
        
        .timeline-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          z-index: 0;
        }
        
        .blob-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(241, 194, 50, 0.15) 0%, rgba(241, 194, 50, 0) 70%);
          top: 10%;
          right: -100px;
          animation: float-slow 20s infinite alternate;
        }
        
        .blob-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(17, 39, 53, 0.8) 0%, rgba(17, 39, 53, 0) 70%);
          bottom: 5%;
          left: -50px;
          animation: float-slow 15s infinite alternate-reverse;
        }
        
        @keyframes float-slow {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
          100% {
            transform: translate(-30px, 30px) scale(0.9);
          }
        }
        
        @media (max-width: 768px) {
          .timeline-track {
            left: 24px;
          }
          
          .timeline-left, .timeline-right {
            justify-content: flex-start;
            padding-left: 64px;
            padding-right: 0;
          }
          
          .timeline-connector {
            left: 24px;
          }
          
          .timeline-card {
            max-width: 100%;
          }
          
          .timeline-left .timeline-card::after, 
          .timeline-right .timeline-card::after {
            left: -8px;
            border-left: 1px solid rgba(241, 194, 50, 0.3);
            border-bottom: 1px solid rgba(241, 194, 50, 0.3);
            border-right: 0;
            border-top: 0;
          }
          
          .timeline-header {
            margin-bottom: 40px;
          }
          
          .timeline-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;