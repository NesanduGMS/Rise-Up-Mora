import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const {
      allocation_date,
      allocation_timeSlot,
      allocated_panel_number,
      candidate_id,
      company_id,
      panelist_id,
      allocation_status,
    } = await req.json();

    console.log(
      allocation_date,
      allocation_timeSlot,
      allocated_panel_number,
      candidate_id,
      company_id,
      panelist_id
    );

    // Validate the required fields
    if (
      !allocation_timeSlot ||
      !allocated_panel_number ||
      !candidate_id ||
      !company_id ||
      !panelist_id
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Update the allocation record
    const updatedAllocation = await prisma.allocation.updateMany({
      where: {
        candidate_id: candidate_id,
        company_id: company_id,
      },
      data: {
        allocation_date: allocation_date, // Update the date provided by the user
        allocation_timeSlot: allocation_timeSlot,
        allocated_panel_number: allocated_panel_number,
        allocation_status: allocation_status || "gg", // Default status if not provided
        attendance: false,
        panelist_id: panelist_id,
      },
    });

    if (updatedAllocation.count === 0) {
      return NextResponse.json(
        { message: "No allocation found to update" },
        { status: 404 }
      );
    }

    // Return a success response
    return NextResponse.json(
      { message: "Allocation updated successfully" },
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
