import prisma from "@/lib/prisma";
import { RegistrationFormDataSendType } from "@/Type";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type Request = {
  id: string;
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: string;
  degree: string;
  department: string;
  cv: FileList;
  photo: FileList;
  email: string;
  userId: string;
  cvUrl: string;
  imgUrl: string;
};

export async function POST(req: NextRequest) {
  try {
    const {
      id,
      firstName,
      lastName,
      nameWithInitials,
      universityID,
      contactNo,
      degree,
      department,
      cv,
      photo,
      email,
      userId,
      cvUrl,
      imgUrl,
    }: Request = await req.json();

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const data = {
      candidate_id: userId, // Match the candidate_id with the user's id
      firstName,
      lastName,
      nameWithInitials,
      universityID,
      contactNo,
      degree,
      department,
      cvUrl,
      imgUrl,
    };

    // const data = await prisma.user.findMany();

    const savedCandidate = await prisma.candidate.create({
      data: data, // Wrap the data in a data property
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imgUrl,
      },
    });

    return NextResponse.json({ savedCandidate });

    // return NextResponse.json({ data });
  } catch (e) {
    // if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
    //   console.log("Error: User not found.");
    //   return NextResponse.json(
    //     {
    //       message:
    //         "This universityId has been used before. Please enter new ID.",
    //     },
    //     { status: 400 }
    //   );
    // }

    console.log(e);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
