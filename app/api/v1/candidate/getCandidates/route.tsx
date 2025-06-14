export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Responce = {
  id: string;
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: number;
  degree: string;
  department: string;
  cv: FileList;
  photo: FileList;
  email: string;
};

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.candidate.findMany({
      include: {
        user: true,
      },
    });

    if (!data) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
