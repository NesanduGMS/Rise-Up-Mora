// pages/api/auth/request-reset-password.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import { sendEmail } from '../../../lib/sendEmail';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/nodemailer';


export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: 'Email is required' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // Token expires in 1 hour



  await prisma.user.update({
    where: { email },
    data: {
      passwordResetToken: token,
      passwordResetTokenExpire: expires,
    },
  });


  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  await sendPasswordResetEmail(email, token);

  return NextResponse.json(
    { message: 'Password reset link sent' },
    { status: 200 }
  );
}
