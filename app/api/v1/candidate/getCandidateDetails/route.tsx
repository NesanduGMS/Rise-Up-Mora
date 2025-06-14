import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  
  const { searchParams } = new URL(req.url);
  const panelistId = searchParams.get("panelistId");


  if (!panelistId) {
    return NextResponse.json({ error: "Invalid panelist ID" }, { status: 400 });
  }

  try {
    // Fetch allocations related to the panelistId, including candidate details
    const allocations = await prisma.allocation.findMany({
      where: { panelist_id: panelistId },
      include: {
        candidate: true,
      },
    });

    // If no allocations are found, return a 404 error
    if (allocations.length === 0) {
      return NextResponse.json(
        { error: "No candidates found for this panelist" },
        { status: 404 }
      );
    }

    // Map the allocations to extract candidate details
    const candidateDetails = allocations.map(
      (allocation) => allocation.candidate
    );

    // Return the candidate details in a successful response
    return NextResponse.json(candidateDetails);
  } catch (error) {
    // Handle server errors by logging and returning a 500 status
    console.error("Error fetching candidate details:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching candidate details" },
      { status: 500 }
    );
  }
}
