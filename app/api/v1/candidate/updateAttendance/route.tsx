import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { allocationId, attended } = await req.json();
    
    if (!allocationId || typeof attended !== "boolean") {
      return NextResponse.json(
        { error: "Invalid data provided" },
        { status: 400 }
      );
    }

    const updatedAllocation = await prisma.allocation.update({
      where: {
        allocation_id: allocationId,
      },
      data: {
        attendance: attended,
      },
    });

    return NextResponse.json(updatedAllocation, { status: 200 });
  } catch (error) {
    console.error("Error updating attendance:", error);
    return NextResponse.json(
      { error: "Failed to update attendance" },
      { status: 500 }
    );
  }
}
