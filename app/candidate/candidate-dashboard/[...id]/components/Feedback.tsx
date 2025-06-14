"use client";
import { Rating } from "@/components/Rating";
import { addFeedback } from "@/service/company";
import Image from "next/image";
// import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Feedback = ({
  panalistId,
  userId,
}: {
  panalistId: string;
  userId: string;
}) => {
  const [communicationSkill, setCommunicationSkill] = useState(0);
  const [experienceAndProject, setExperienceAndProject] = useState(0);
  const [problemSolvingSkill, setProblemSolvingSkill] = useState(0);
  const [technicalSkill, setTechnicalSkill] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    if (panalistId === "" || userId === "") {
      setLoading(false);
      return toast.error("something went wrong");
    }

    const data = {
      communicationSkill,
      experienceAndProject,
      problemSolvingSkill,
      technicalSkill,
      feedback,
      panalistId,
      userId,
    };

    function cleanTheFeilds() {
      setCommunicationSkill(0);
      setExperienceAndProject(0);
      setProblemSolvingSkill(0);
      setTechnicalSkill(0);
      setFeedback("");
    }

    const res = await addFeedback(data);

    if ((res.message = "success")) {
      toast.success("Feedback added successfully");
      cleanTheFeilds();
      setLoading(false);
      return;
    }

    if ((res.message = "Error adding feedback")) {
      toast.error("Error adding feedback");
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-bold  font-poppins flex gap-3">
        Feedback
      </div>
      <div className="flex w-10/12 flex-col gap-5">
        <div className="flex justify-between items-center ">
          <div>Communication Skill</div>
          <div className=" ">
            <Rating
              value={communicationSkill}
              onChange={setCommunicationSkill}
            />
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div>Experience And Project</div>
          <div className=" ">
            <Rating
              value={experienceAndProject}
              onChange={setExperienceAndProject}
            />
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div>ProblemSolving Skill</div>
          <div className=" ">
            <Rating
              value={problemSolvingSkill}
              onChange={setProblemSolvingSkill}
            />
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div>Technical Skill</div>
          <div className=" ">
            <Rating value={technicalSkill} onChange={setTechnicalSkill} />
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div>Feedback</div>
          <div className=" ">
            <textarea
              className="w-full h-10 p-2 border-2 border-gray-200 rounded-lg"
              placeholder="Enter your feedback here"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div>
          <button
            // onSubmit={onSubmit}
            // type="submit"
            onClick={onSubmit}
            className={`w-4/5 md:w-1/3 lg:w-1/4 p-1 bg-[#0c2735] text-white font-bold rounded-full `}
          >
            {loading ? (
              <div className="flex justify-center">
                <Image
                  alt="spinner"
                  src="/spinner/loading.svg"
                  width={20}
                  height={20}
                />
              </div>
            ) : (
              "Save"
            )}

            {/* save */}
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  value: number;
  onChange: (newValue: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<number | null>(null);

  const handleClick = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const midPoint = rect.width / 2;

    // Increase or decrease progress by 10% based on click position
    let newValue;
    if (clickX > midPoint) {
      newValue = Math.min(value + 10, 100); // Increase by 10% but max at 100%
    } else {
      newValue = Math.max(value - 10, 0); // Decrease by 10% but min at 0%
    }

    onChange(newValue);
  };

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const newHoverValue = Math.round((hoverX / rect.width) * 100);

    // Ensure the tooltip stays within the progress bar bounds
    const tooltipX = Math.min(Math.max(hoverX, 0), rect.width);

    setHoverValue(newHoverValue);
    setTooltipPosition(tooltipX);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
    setTooltipPosition(null);
  };

  return (
    <div
      className="relative w-full bg-gray-200 rounded-full h-4 cursor-pointer"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
      {hoverValue !== null && tooltipPosition !== null && (
        <div
          className="absolute text-xs text-white bg-black px-1 py-0.5 rounded"
          style={{
            top: "-24px",
            left: `${tooltipPosition}px`,
            transform: "translateX(-50%)",
          }}
        >
          {hoverValue}%
        </div>
      )}
    </div>
  );
};

const ProgressBarWrapper: React.FC = () => {
  const [progress, setProgress] = useState<number>(10);

  const handleProgressChange = (newValue: number) => {
    setProgress(newValue);
    // console.log(`Progress changed to: ${newValue}%`);
  };

  return (
    <div className="p-4">
      <ProgressBar value={progress} onChange={handleProgressChange} />
    </div>
  );
};
export default Feedback;
