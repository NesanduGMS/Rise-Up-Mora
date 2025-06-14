import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: any) {
  try {
    if (!params.email) {
      return NextResponse.json({ message: "No email" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: params.email,
      },
      include: {
        candidate: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user  not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
