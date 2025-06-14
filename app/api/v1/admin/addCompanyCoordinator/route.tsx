import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

type Request = {
  coordinatorName: string;
  companyId: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const { coordinatorName, companyId, email, password }: Request =
      await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const excistCompanyCoordinator = await prisma.companyCordinator.findUnique({
      where: {
        company_id: companyId,
      },
    });
    if (excistCompanyCoordinator) {
      return NextResponse.json(
        {
          message: "A company coordinator already allocated for this company ",
        },
        { status: 400 }
      );
    }

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

    const user = await prisma.user.create({
      data: {
        name: coordinatorName,
        email,
        emailVerifyStatus: true,
        password: hashedPassword,
        role: "companyCoordinator",
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Error adding company coordinator" },
        { status: 500 }
      );
    }

    const companyCoordinator = await prisma.companyCordinator.create({
      data: {
        company_id: companyId,
        cordinator_id: user.id,
      },
    });
    if (!companyCoordinator) {
      return NextResponse.json(
        { message: "Error adding company coordinator" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Company coordinator added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error adding company coordinator" },
      { status: 500 }
    );
  }
}
