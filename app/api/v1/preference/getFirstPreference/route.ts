import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Step 1: Fetch allocation counts grouped by company_id where allocation_status is "1"
    const allocationCounts = await prisma.allocation.groupBy({
      by: ['company_id'],
      _count: {
        company_id: true,
      },
      where: {
        allocation_status: "1", // Filter by allocation_status
      },
    });

    // Step 2: Fetch company names based on the company_ids from allocationCounts
    const companyIds = allocationCounts.map((item) => item.company_id);
    const companies = await prisma.company.findMany({
      where: {
        company_id: {
          in: companyIds,
        },
      },
      select: {
        company_id: true,
        company_name: true,
      },
    });

    // Step 3: Map the counts to the corresponding company names
    const result = allocationCounts.map((item) => {
      const company = companies.find((company) => company.company_id === item.company_id);
      return {
        companyName: company?.company_name || "Unknown Company",
        allocationCount: item._count.company_id,
      };
    });

    

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error getting allocation counts with company names", error);
    return NextResponse.json(
      { error: "Error getting allocation counts with company names" },
      { status: 500 }
    );
  }
}
