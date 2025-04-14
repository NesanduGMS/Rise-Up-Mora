import React from 'react';
import { Calendar } from 'lucide-react';

const TimelineEvent = ({ date, title, description }: {
  date: string;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4 mb-8">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Calendar className="text-blue-600" />
      </div>
    </div>
    <div>
      <time className="text-sm text-gray-500">{date}</time>
      <h3 className="text-lg font-semibold text-gray-900 mt-1">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);

const Timeline = () => {
  return (
    <section id="timeline" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Timeline</h2>
        <div className="max-w-3xl mx-auto">
          <TimelineEvent
            date="3:00 PM - August 27th, 2024"
            title="Session 01 BY MAS"
            description="LinkedIn profile creation and maintenance."
          />
          <TimelineEvent
            date="6:00 PM - September 3rd, 2024"
            title="Session 02 BY IFS"
            description="Excelling in CV writing."
          />
          <TimelineEvent
            date="6:00 PM - September 10th, 2024"
            title="Session 03 BY IFS"
            description="How to face in Interview."
          />
        </div>
      </div>
    </section>
  );
};

export default Timeline;