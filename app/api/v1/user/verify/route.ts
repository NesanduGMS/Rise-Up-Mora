import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    
    if (!token || typeof token !== "string") {
      
      return NextResponse.json(
        { message: "verification failed" },
        { status: 400 }
      );
    }

    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });
    

    if (!verificationToken) {
      
      return NextResponse.json(
        { message: "verification failed" },
        { status: 400 }
      );
    }

    const isTokenValid = token == verificationToken.token;

    if (!isTokenValid) {
      return NextResponse.json(
        { message: "verification failed" },
        { status: 400 }
      );
    }
    const newDate = new Date();
    newDate.setHours(newDate.getHours() - 144);
    if (newDate  > verificationToken.expires) {
      return NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date(), emailVerifyStatus: true },
    });

    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
