export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Extract the company_id from the query parameters
    const { searchParams } = new URL(req.url);
    const cordinator_id = searchParams.get("cordinator_id");

    if (!cordinator_id) {
      return NextResponse.json(
        { message: "cordinator_id is required" },
        { status: 400 }
      );
    }

    // Find panels related to the company_id
    const data = await prisma.departmentCordinator.findMany({
      where: { cordinator_id: cordinator_id },
    });

    return NextResponse.json({ data });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
