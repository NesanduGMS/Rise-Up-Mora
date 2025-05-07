import { useEffect, useRef, useState } from 'react';
import { Calendar, Check } from 'lucide-react';

interface TimelineEventProps {                                              
  date: string;
  title: string;
  description: string;
  index: number;
  isCompleted: boolean;
  isActive: boolean;
}

const TimelineEvent = ({ date, title, description, index, isCompleted, isActive }: TimelineEventProps) => {
  const eventRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [showCheck, setShowCheck] = useState(isCompleted);
  
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

  // Effect to handle icon transition when progress indicator reaches the event
  useEffect(() => {
    // Only trigger animation if event is active (progress indicator is at this point)
    // and it's supposed to be completed but check icon isn't shown yet
    if (isActive && isCompleted && !showCheck) {
      if (dotRef.current) {
        // Start the icon transition animation
        dotRef.current.classList.add('icon-transition');
      }
      
      // Wait for the animation to complete before showing the check icon
      const timer = setTimeout(() => {
        setShowCheck(true);
        if (dotRef.current) {
          dotRef.current.classList.add('completed');
          dotRef.current.classList.remove('icon-transition');
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, isCompleted, showCheck]);

  return (
    <div 
      ref={eventRef}
      className={`timeline-event opacity-0 translate-y-8 ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
      data-index={index}
    >
      <div className="timeline-connector">
        <div 
          ref={dotRef}
          className={`timeline-dot ${showCheck ? 'completed' : ''}`}
        >
          {showCheck ? 
            <Check size={20} className="timeline-icon" /> : 
            <Calendar size={20} className="timeline-icon" />
          }
        </div>
      </div>
      <div className={`timeline-card ${showCheck ? 'completed' : ''}`}>
        <div className="timeline-date">{date}</div>
        <h3 className="timeline-title">{title}</h3>
        <p className="timeline-description">{description}</p>
      </div>
    </div>
  );
};

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressIndicatorRef = useRef<HTMLDivElement>(null);
  const [completedEvents, setCompletedEvents] = useState<number>(0);
  const [activeEventIndex, setActiveEventIndex] = useState<number>(-1);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
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

  useEffect(() => {
    setCompletedEvents(2);  // should realtime update
  }, []);
  
  useEffect(() => {
    const checkVisibility = () => {
      if (!timelineRef.current) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.8;
       
      const isInViewport = rect.top < triggerPoint;
      
      if (isInViewport && !isVisible) {
        setIsVisible(true);
        
        if (progressIndicatorRef.current) {
          progressIndicatorRef.current.style.top = '0%';
          
          setTimeout(() => {
            if (completedEvents > 0 && events.length > 0) {
              const eventPositionPercentage = (completedEvents - 0.5) / events.length * 100;
              progressIndicatorRef.current.style.setProperty('--completed-percent', (eventPositionPercentage / 100).toString());
            } else {
              progressIndicatorRef.current.style.setProperty('--completed-percent', '0');
            }
            progressIndicatorRef.current.classList.add('animate-slide-down');
          }, 300);
        }
      } else if (!isInViewport && isVisible) {
        setIsVisible(false);
        if (progressIndicatorRef.current) {
          progressIndicatorRef.current.classList.remove('animate-slide-down');
        }
      }
    };
    
    
    checkVisibility();
    
    window.addEventListener('scroll', checkVisibility);
    return () => window.removeEventListener('scroll', checkVisibility);
  }, [isVisible, completedEvents, events.length]);

  useEffect(() => {
    const updateProgressIndicator = () => {
      if (!timelineRef.current || !progressIndicatorRef.current || !trackRef.current) return;
      
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const trackRect = trackRef.current.getBoundingClientRect();
      
      if (timelineRect.top > window.innerHeight) {
        setProgress(0);
        setActiveEventIndex(-1);
        return;
      }
      
      if (timelineRect.bottom < 0) {
        const lastCompletedPosition = completedEvents > 0 ? 
          (completedEvents - 0.5) / events.length : 0;
        setProgress(lastCompletedPosition);
        return;
      }
      
      const timelineHeight = timelineRect.height;
      const scrollPosition = window.innerHeight - timelineRect.top;
      const scrollPercentage = Math.min(scrollPosition / (timelineHeight + window.innerHeight), 1);
      
      const eventsTotal = events.length;
      const eventHeight = 1 / eventsTotal;
      
      // Calculate where the progress indicator should stop (based on completed events)
      const maxCompletePosition = completedEvents > 0 ? 
        (completedEvents - 0.5) / eventsTotal : 0;
      
      // Calculate the current position based on scroll
      const currentEventIndex = Math.floor(scrollPercentage * eventsTotal);
      const currentPosition = currentEventIndex > 0 ? 
        (currentEventIndex - 0.5) / eventsTotal : 0;
      
      // Use the lower of the two values to prevent scrolling past completed events
      const finalProgress = Math.min(maxCompletePosition, currentPosition);
      
      // Update the progress state
      setProgress(finalProgress);
      
      // Set the active event index - THIS IS KEY FOR THE ICON TRANSITIONS
      // Only trigger icon transitions for events that are both in view AND completed
      if (currentEventIndex !== activeEventIndex && 
          currentEventIndex >= 0 && 
          currentEventIndex < completedEvents) {
        setActiveEventIndex(currentEventIndex);
      }
    };
    
    
    updateProgressIndicator();
    
    
    window.addEventListener('scroll', updateProgressIndicator);
    return () => window.removeEventListener('scroll', updateProgressIndicator);
  }, [completedEvents, activeEventIndex, events.length]);

  
  useEffect(() => {
    if (progressIndicatorRef.current) {
      
      progressIndicatorRef.current.style.top = `${progress * 100}%`;
    }
  }, [progress]);

  
  const isEventCompleted = (index: number) => {
    return index < completedEvents;
  };

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
        
        <div className="timeline-wrapper" ref={timelineRef}>
          <div className="timeline-track" ref={trackRef}>
            <div className="progress-indicator" ref={progressIndicatorRef}>
              <div className="indicator-circle">
                <Check size={16} className="indicator-icon" />
              </div>
            </div>
          </div>
          
          {events.map((event, index) => (
            <TimelineEvent
              key={index}
              date={`${event.date} - ${event.time}`}
              title={event.title}
              description={event.description}
              index={index}
              isCompleted={isEventCompleted(index)}
              isActive={activeEventIndex === index}
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
          min-height: 600px;
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
        
        .progress-indicator {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          z-index: 10;
          transition: top 0.5s cubic-bezier(0.33, 1, 0.68, 1);
          pointer-events: none;
        }
        
        .indicator-circle {
          width: 36px;
          height: 36px;
          background: #f1c232;
          border: 3px solid #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(241, 194, 50, 0.8);
          /* Perfect centering on the track */
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%);
          z-index: 20;
        }
        
        .indicator-icon {
          color: #112735;
        }
        
        .animate-slide-down {
          animation: slideDownAndStop 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
        
        @keyframes slideDownAndStop {
          0% {
            top: 0;
          }
          100% {
            top: calc(var(--completed-percent, 0.6) * 100%);
          }
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
          /* Center point for the timeline events */
          top: 24px;
          left: 50%;
          /* Don't transform the connector - let the dot handle its own positioning */
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
          overflow: hidden;
          /* Center perfectly on the timeline's midline */
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%);
        }
        
        .timeline-dot.completed {
          background: linear-gradient(135deg, #1a3d54, #2a5274);
          border-color: #f1c232;
        }
        
        .timeline-icon {
          color: #f1c232;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        
        .timeline-dot.completed .timeline-icon {
          color: #f1c232;
        }
        
        .icon-transition .timeline-icon {
          animation: iconPulse 0.6s ease forwards;
        }
        
        @keyframes iconPulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0);
            opacity: 0;
          }
          51% {
            content: '';
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
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
        
        .timeline-card.completed {
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: linear-gradient(135deg, rgba(241, 194, 50, 0.05), rgba(241, 194, 50, 0.15));
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
          font-size: 20px;
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
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline-event:hover .timeline-dot {
          transform: translate(-50%, -50%) scale(1.1);
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
          
          .progress-indicator {
            left: 24px;
          }
          
          .indicator-circle {
            /* Maintain perfect alignment on mobile */
            transform: translate(-50%, -50%);
          }
          
          .timeline-left, .timeline-right {
            justify-content: flex-start;
            padding-left: 64px;
            padding-right: 0;
          }
          
          .timeline-connector {
            left: 24px;
          }
          
          .timeline-dot {
            /* Perfect alignment on mobile */
            transform: translate(-50%, -50%);
          }
          
          .timeline-event:hover .timeline-dot {
            transform: translate(-50%, -50%) scale(1.1);
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