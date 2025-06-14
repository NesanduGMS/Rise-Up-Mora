import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    // Delete all records from each table
    // await prisma.feedback.deleteMany({});
    // await prisma.allocation.deleteMany({});
    // await prisma.panelist.deleteMany({});
    // await prisma.companyCordinator.deleteMany({});
    // await prisma.departmentCordinator.deleteMany({});
    // await prisma.admin.deleteMany({});
    // await prisma.authenticator.deleteMany({});
    // await prisma.account.deleteMany({});
    // await prisma.session.deleteMany({});
    // await prisma.verificationToken.deleteMany({});
    // await prisma.candidate.deleteMany({});
    // await prisma.company.deleteMany({});
    // await prisma.user.deleteMany({});

    return NextResponse.json(
      { message: "All records deleted successfully from all tables" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Server error occurred" },
      { status: 500 }
    );
  }
}
