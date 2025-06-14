import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Department } from "@prisma/client";

type Request = {
  coordinatorName: string;
  departmentName: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const { coordinatorName, departmentName, email, password }: Request =
      await req.json();
    console.log(coordinatorName, departmentName, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const excistUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (excistUser) {
      console.log("user already exists ");
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
        role: "departmentCoordinator",
      },
    });

    console.log(user);

    if (!user) {
      console.log("error adding user");
      return NextResponse.json(
        { message: "Error adding department coordinator" },
        { status: 500 }
      );
    }
    const depEnum = departmentName as Department;
    console.log(Department);
    console.log(depEnum);
    const departmentCoordinator = await prisma.departmentCordinator.create({
      data: {
        department: depEnum,
        cordinator_id: user.id,
      },
    });

    if (!departmentCoordinator) {
      console.log("error adding department coordinator");
      return NextResponse.json(
        { message: "Error adding department coordinator" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Department coordinator added successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error adding company coordinator" },
      { status: 500 }
    );
  }
}
