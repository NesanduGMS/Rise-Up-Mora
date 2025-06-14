export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.feedback.findMany();

    return NextResponse.json({ data });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
