export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract the ID from the URL using the pathname
    const { pathname } = new URL(req.url);
    const candidateId = pathname.split("/").pop();
    console.log("Candidate ID:", candidateId);

    if (!candidateId) {
      return NextResponse.json(
        { message: "Candidate ID is required" },
        { status: 400 }
      );
    }

    // Log for debugging purposes

    // Query the database using Prisma
    const data = await prisma.allocation.findMany({
      where: {
        candidate_id: candidateId,
      },
      include: {
        company: true,
      },
    });

    return NextResponse.json(data);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json(
      { message: "Error of the server" },
      { status: 500 }
    );
  }
}
