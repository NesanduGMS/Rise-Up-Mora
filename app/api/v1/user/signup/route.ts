import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/lib/nodemailer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { username, password, email } = await req.json();

    if (!username || !password || !email) {
      return NextResponse.json(
        { message: "username, password and email are required" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
        email,
        role: "candidate",
      },
    });

    if (!user) {
      return NextResponse.json({ message: "server error" }, { status: 500 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // Token valid for 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashedToken,
        expires,
      },
    });

    await sendVerificationEmail(email, hashedToken);

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
