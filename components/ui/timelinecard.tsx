import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

// registering gsap
gsap.registerPlugin(ScrollTrigger);

interface TimelineCardProps {
  topic: string;
  subtopic: string;
  description: string;
  className?: string; // Make className optional
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  topic,
  subtopic,
  description,
  className,
}) => {
  const timelineCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineCardRef.current) {
      gsap.fromTo(
        timelineCardRef.current,
        {
          transform: "translate3d(100px, 0, 0)",
          opacity: 0.5,
        },
        {
          transform: "translate3d(0, 0, 0)",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineCardRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <Link
      target="_blank"
      href="https://www.youtube.com/watch?v=iiceaXENNAQ&ab_channel=IEEEStudentBranch-UniversityofMoratuwa"
    >
      <div
        className={`relative flex justify-center items-center font-poppins ${className}`}
        ref={timelineCardRef}
      >
        <div className="bg-gray-700 h-[210px] w-0.5 -translate-x-10"></div>
        <div className="w-3 h-3 bg-black rounded-full -translate-x-[46px]"></div>
        <div className="relative inline-block p-4 pr-10 bg-[#f1c232] rounded-br-full px-7">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0c2735] rounded-br-full -translate-x-3"></div>
          <div className="inline-block py-3 px-1 mr-20 -translate-x-5">
            <div className="inline-block px-2 py-1 mb-5 bg-[#f1c232] rounded-md">
              <span className="text-sm font-bold text-blue-900">{topic}</span>
            </div>
            <p className="mt-2 text-white">{subtopic}</p>
            <p className="mt-2 mr-10 text-white">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TimelineCard;
