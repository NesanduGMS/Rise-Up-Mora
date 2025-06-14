import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.passwordResetToken || !data.data.newPassword) {
      return NextResponse.json(
        { message: "Token and new password are required" },
        { status: 400 }
      );
    }

    const resetToken = await prisma.user.findFirst({
      where: { passwordResetToken: data.passwordResetToken },
    });
  

    if (!resetToken || resetToken.passwordResetTokenExpire < new Date()) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.data.newPassword, 10);


    await prisma.user.update({
      where: { id: resetToken.id },
      data: { password: hashedPassword, passwordResetToken: "" },
    });

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
  } catch (e) {
    console.error("Error during password reset:", e);
    return NextResponse.json(
      { message: "Password reset failed" },
      { status: 500 }
    );
  }
}
