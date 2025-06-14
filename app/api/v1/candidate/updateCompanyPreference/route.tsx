import prisma from "@/lib/prisma";
import { Candidate } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (
      !data.email ||
      !data.prefCompany1 ||
      !data.prefCompany2 ||
      !data.prefCompany3 ||
      !data.prefCompany4
    ) {
      return NextResponse.json(
        { message: "Please select all preferences" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const updatedCandidate = await prisma.candidate.update({
      where: { candidate_id: user.id },
      data: {
        prefCompany1: data.prefCompany1,
        prefCompany2: data.prefCompany2,
        prefCompany3: data.prefCompany3,
        prefCompany4: data.prefCompany4,
      } as Candidate, // Add type assertion here
    });

    if (!updatedCandidate) {
      return NextResponse.json(
        { message: "update company preference failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Company preference updated successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error during updating company preference:", e);
    return NextResponse.json(
      { message: "update company preference failed" },
      { status: 500 }
    );
  }
}
