import prisma from "@/lib/prisma";
import { RegistrationFormDataSendType } from "@/Type";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type Request = {
  companyName: string;
  companyId: string;
  companyIcone: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id[0];

    const companyAllcation = await prisma.allocation.findMany({
      where: {
        company_id: id,
      },
      orderBy: [
        {
          allocation_status: "asc", // Sort by allocation_status first
        },
        {
          candidate: {
            createdAt: "asc", // Then sort by candidate's createdAt date
          },
        },
      ],
      include: {
        candidate: {
          include: {
            user: true,
          },
        },
      },
    });

    console.log(id);
    // const { companyName, companyId, companyIcone }: Request = await req.json();

    return NextResponse.json(companyAllcation);
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
