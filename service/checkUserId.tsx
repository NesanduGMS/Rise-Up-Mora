"use server";
import prisma from "@/lib/prisma";
import { RegistrationFormDataSendType, RegistrationFormDataType } from "@/Type";
import axios from "axios";
import toast from "react-hot-toast";

export const checkUserId = async ({ userId }: { userId: string }) => {
  // export const getCandidate = async (data: string) => {
  // const data = "clyld3pa40000wb6y5trem706";

  // if (!userId) return;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking user ID:", error);
    return false;
  }
};

export const checkUniId = async ({
  universityID,
}: {
  universityID: string;
}) => {
  // export const getCandidate = async (data: string) => {
  // const data = "clyld3pa40000wb6y5trem706";

  // if (!userId) return;

  try {
    const user = await prisma.candidate.findUnique({
      where: {
        universityID,
      },
    });

    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking user ID:", error);
    return false;
  }
};
