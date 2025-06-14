export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const companies = await prisma.company.findMany();

    return NextResponse.json({ companies });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2021") {
        // console.error("Table not found:", e.meta?.modelName);
        return NextResponse.json(
          {
            message: `The table ${e.meta?.modelName} does not exist in the database.`,
          },
          { status: 404 }
        );
      }
      // Add more specific error cases here if needed
    }
    // console.error("Unexpected error:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
