import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { cvUrl, userId } = data;

    // console.log(cvUrl, userId);

    const updatedCandidate = await prisma.candidate.update({
      where: { candidate_id: userId },
      data: { cvUrl },
    });

    // console.log(updatedCandidate);

    if (!updatedCandidate) {
      return NextResponse.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
