import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Department } from "@prisma/client";

type Request = {
  panelistName: string;
  comId: string;
  panelNumber: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const { panelistName, comId, panelNumber, email, password }: Request =
      await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const excistUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (excistUser) {
      return NextResponse.json(
        { message: "A user already exists with this email" },
        { status: 400 }
      );
    }
    const existingPanelist = await prisma.panelist.findFirst({
      where: {
        pannel_number: parseInt(panelNumber),
        company_id: comId,
      },
    });

    if (existingPanelist) {
      return NextResponse.json(
        { message: "Already added a panelist for this panel" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: panelistName,
        email,
        emailVerifyStatus: true,
        password: hashedPassword,
        role: "panelist",
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Error adding panelist" },
        { status: 500 }
      );
    }

    const panelist = await prisma.panelist.create({
      data: {
        company_id: comId,
        pannel_number: parseInt(panelNumber),
        panelist_id: user.id,
      },
    });

    if (!panelist) {
      return NextResponse.json(
        { message: "Error adding panelist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Panelist added successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error adding panelist" },
      { status: 500 }
    );
  }
}
