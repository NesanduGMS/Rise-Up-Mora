import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const { candidate_id } = await req.json();

    if (!candidate_id) {
      return NextResponse.json(
        { message: "Candidate ID is required" },
        { status: 400 }
      );
    }

    await prisma.allocation.deleteMany({
      where: { candidate_id: candidate_id },
    });

    return NextResponse.json(
      { message: "Allocations deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Server error occurred" },
      { status: 500 }
    );
  }
}
