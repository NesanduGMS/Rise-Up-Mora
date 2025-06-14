export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.allocation.findMany();
    const sortedData = data.sort(
      (a, b) =>
        parseInt(a.allocation_status ?? "0") -
        parseInt(b.allocation_status ?? "0")
    );

    console.log(sortedData);

    if (!data) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
    // console.log(data);
    return NextResponse.json({ data });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
