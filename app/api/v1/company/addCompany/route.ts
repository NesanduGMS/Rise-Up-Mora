import prisma from "@/lib/prisma";
import { RegistrationFormDataSendType } from "@/Type";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type Request = {
  companyName: string;
  companyId: string;
  companyIcone: string;
};

export async function POST(req: NextRequest) {
  try {
    const { companyName, companyId, companyIcone }: Request = await req.json();

    // return NextResponse.json({ companyName, companyId, companyIcone });
    // console.log(userId);
    const userExists = await prisma.company.findUnique({
      where: {
        company_id: companyId,
      },
    });

    if (userExists != null) {
      return NextResponse.json(
        { message: "This Id has been used before." },
        { status: 400 }
      );
    }

    // const data = {
    //   candidate_id: userId, // Match the candidate_id with the user's id
    //   firstName,
    //   lastName,
    //   nameWithInitials,
    //   universityID,
    //   contactNo,
    //   degree,
    //   department,
    //   cvUrl,
    //   imgUrl,
    // };
    // console.log(data);

    // const data = await prisma.user.findMany();

    const company = await prisma.company.create({
      data: {
        company_id: companyId,
        company_name: companyName,
        company_logo: companyIcone,
      },
    });

    // const updatedUser = await prisma.user.update({
    //   where: {
    //     id: userId,
    //   },
    //   data: {
    //     image: imgUrl,
    //   },
    // });

    return NextResponse.json({ company });
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
