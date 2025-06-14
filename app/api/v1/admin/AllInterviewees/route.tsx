import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Helper function to accumulate all chunks of incoming data
async function accumulateRequestBody(req: NextRequest) {
  const reader = req.body?.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = (await reader?.read()) || {};
    if (value) {
      chunks.push(value);
    }
    done = readerDone ?? false;
  }

  // Flatten Uint8Array chunks into a single array
  const body = new Uint8Array(
    chunks.reduce((acc, chunk) => {
      const newAcc = new Uint8Array(acc.length + chunk.length);
      newAcc.set(acc);
      newAcc.set(chunk, acc.length);
      return newAcc;
    }, new Uint8Array())
  );

  // Decode the flattened array into a string and parse JSON
  const decodedBody = new TextDecoder().decode(body);
  return JSON.parse(decodedBody);
}

export async function POST(req: NextRequest) {
  try {
    const incomingAllocations = await accumulateRequestBody(req);
    const allocationsArray = Array.isArray(incomingAllocations)
      ? incomingAllocations
      : [incomingAllocations];

    const candidate_id = allocationsArray[0]?.candidate_id;
    if (!candidate_id) {
      return NextResponse.json(
        { message: "Candidate ID is required" },
        { status: 400 }
      );
    }

    const existingAllocations = await prisma.allocation.findMany({
      where: { candidate_id },
    });

    const incomingCompanyIds = new Set(
      allocationsArray.map((allocation) => allocation.company_id)
    );

    const existingCompanyIds = new Set(
      existingAllocations.map((allocation) => allocation.company_id)
    );

    const allocationsToDelete = existingAllocations.filter(
      (allocation) => !incomingCompanyIds.has(allocation.company_id)
    );

    if (allocationsToDelete.length > 0) {
      await prisma.allocation.deleteMany({
        where: {
          candidate_id,
          company_id: {
            in: allocationsToDelete.map((allocation) => allocation.company_id),
          },
        },
      });
    }

    const allocationsToCreate = allocationsArray.filter(
      (allocation) => !existingCompanyIds.has(allocation.company_id)
    );

    if (allocationsToCreate.length > 0) {
      const createPromises = allocationsToCreate.map((allocation) =>
        prisma.allocation.create({
          data: {
            allocation_date: allocation.allocation_date,
            allocation_timeSlot: allocation.allocation_timeSlot,
            allocated_panel_number: allocation.allocated_panel_number,
            attendance: allocation.attendance ?? false,
            candidate: {
              connect: { candidate_id: allocation.candidate_id },
            },
            company: {
              connect: { company_id: allocation.company_id },
            },
            panelist: {
              connect: { panelist_id: allocation.panelist_id },
            },
            allocation_status: allocation.allocation_status,
          },
        })
      );
      await Promise.all(createPromises);
    }

    return NextResponse.json(
      { message: "Allocations processed successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Server error occurred" },
      { status: 500 }
    );
  }
}
