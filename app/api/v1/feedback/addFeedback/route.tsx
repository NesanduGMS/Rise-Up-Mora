import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type Request = {
  communicationSkill: number;
  experienceAndProject: number;
  problemSolvingSkill: number;
  technicalSkill: number;
  feedback: string;
  panalistId: string;
  candidateId: string;
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // console.log(data);

    // console.log(
    //   data.communicationSkill,
    //   data.experienceAndProject,
    //   data.problemSolvingSkill,
    //   data.technicalSkill,
    //   data.feedback,
    //   data.panalistId,
    //   data.userId
    // );
    // Validate all required fields
    if (!data.panalistId || !data.userId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find panelist by ID
    const panalist = await prisma.panelist.findUnique({
      where: {
        panelist_id: data.panalistId,
      },
    });

    // console.log(panalist);

    if (!panalist) {
      return NextResponse.json(
        { message: "Panelist not found." },
        { status: 404 }
      );
    }

    // Prepare new feedback data
    const newFeedback = {
      communicationSkill: data.communicationSkill,
      experienceAndProject: data.experienceAndProject,
      problemSolvingSkill: data.problemSolvingSkill,
      technicalSkill: data.technicalSkill,
      feedback: data.feedback,
      company_id: panalist.company_id,
      candidate_id: data.userId,
    };

    // Save feedback in the database
    const feedback = await prisma.feedback.create({
      data: newFeedback,
    });

    if (!feedback) {
      return NextResponse.json(
        { message: "Error adding feedback" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "success" });
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError) {
      // Handle Prisma specific errors
      if (e.code === "P2025") {
        return NextResponse.json(
          { message: "Record not found." },
          { status: 404 }
        );
      }
    }

    // Log the error for debugging
    console.log(e);

    // Return generic error response
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
