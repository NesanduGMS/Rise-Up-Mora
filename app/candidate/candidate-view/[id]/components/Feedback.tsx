"use client";
import React, { useEffect, useState } from "react";
import FeedBackComponent from "./FeedBackComponent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Feedback({ candidateId }: { candidateId: string }) {
  const [feedbackdata, setFeedbackData] = useState([]);

  useEffect(() => {
    const feedbackdata = async () => {
      const response = await fetch(
        `/api/v1/candidate/getFeedback/${candidateId}`
      );
      const data = await response.json();

      setFeedbackData(data);
    };
    feedbackdata();
  }, [candidateId]);

  // console.log(feedbackdata);

  return (
    <div className="mt-8  md:text-xl">
      <b>Feedback:</b>
      <div className="w-105 h-auto mt-2.5">
        {feedbackdata.length > 0 ? (
          <Carousel>
            <CarouselContent>
              {feedbackdata.map((feedback: any) => (
                <CarouselItem key={feedback.id}>
                  <FeedBackComponent
                    key={feedback.id}
                    company={feedback.company.company_name}
                    communication={feedback.communicationSkill}
                    experience={feedback.experienceAndProject}
                    problemSolving={feedback.problemSolvingSkill}
                    technical={feedback.technicalSkill}
                    feedback={feedback.feedback}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="text-gray-400 py-2.5 text-base  text-center border-2 border-stv-blue rounded-lg">
            No feedback available.
          </div>
        )}
      </div>
    </div>
  );
}
