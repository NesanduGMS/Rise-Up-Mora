import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import this if using Next.js for handling images
import toast from "react-hot-toast";

export default function CompanyPreference({
  userEmail,
  pref1,
  pref2,
  pref3,
  pref4,
}: {
  userEmail: string;
  pref1: string;
  pref2: string;
  pref3: string;
  pref4: string;
}) {
  const [prefCompany1, setPrefCompany1] = useState(pref1 || "");
  const [prefCompany2, setPrefCompany2] = useState(pref2 || "");
  const [prefCompany3, setPrefCompany3] = useState(pref3 || "");
  const [prefCompany4, setPrefCompany4] = useState(pref4 || "");
  const [updatedCompanyList, setUpdatedCompanyList] = useState<
    { company_id: number; company_name: string }[]
  >([]);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    const fetchCompanyData = async () => {
      const response = await fetch(`/api/v1/company/getAllCompany`);
      const responseData = await response.json();
      setUpdatedCompanyList(responseData.companies);
    };

    fetchCompanyData();
  }, []);

  const getFilteredCompanies = (selectedCompanies: string[]) => {
    return updatedCompanyList.filter(
      (company) => !selectedCompanies.includes(company.company_name)
    );
  };

  const updateCompanyPreference = async () => {
    if (!prefCompany1 || !prefCompany2 || !prefCompany3 || !prefCompany4) {
      toast.error("Please select all preferences");
      return;
    }

    setLoading(true); // Start loading spinner
    const data = {
      email: userEmail,
      prefCompany1,
      prefCompany2,
      prefCompany3,
      prefCompany4,
    };

    try {
      const response = await fetch(
        "/api/v1/candidate/updateCompanyPreference",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      toast.success(responseData.message);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return updatedCompanyList.length === 0 ? (
    <div></div>
  ) : (
    <div className="my-5">
      <div className="border-t-2 border-custom-black h-0.5 w-full my-6"></div>
      <div className="text-lg mb-5 font-semibold">
        Choose your company preference from here
      </div>
      <div className="grid gap-4">
        <div className="flex items-center space-x-4">
          <div className="">Preference 1</div>
          <Select
            value={prefCompany1}
            onValueChange={(value) => setPrefCompany1(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="bg-white">
                <SelectLabel>Company</SelectLabel>
                {getFilteredCompanies([]).map((company) => (
                  <SelectItem
                    key={company.company_id}
                    value={company.company_name}
                  >
                    {company.company_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="">Preference 2</div>
          <Select
            value={prefCompany2}
            onValueChange={(value) => setPrefCompany2(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="bg-white">
                <SelectLabel>Company</SelectLabel>
                {getFilteredCompanies([prefCompany1]).map((company) => (
                  <SelectItem
                    key={company.company_id}
                    value={company.company_name}
                  >
                    {company.company_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="">Preference 3</div>
          <Select
            value={prefCompany3}
            onValueChange={(value) => setPrefCompany3(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="bg-white">
                <SelectLabel>Company</SelectLabel>
                {getFilteredCompanies([prefCompany1, prefCompany2]).map(
                  (company) => (
                    <SelectItem
                      key={company.company_id}
                      value={company.company_name}
                    >
                      {company.company_name}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="">Preference 4</div>
          <Select
            value={prefCompany4}
            onValueChange={(value) => setPrefCompany4(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="bg-white">
                <SelectLabel>Company</SelectLabel>
                {getFilteredCompanies([
                  prefCompany1,
                  prefCompany2,
                  prefCompany3,
                ]).map((company) => (
                  <SelectItem
                    key={company.company_id}
                    value={company.company_name}
                  >
                    {company.company_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <button
        className="my-4 bg-[#0c2735] text-white font rounded-[10px] border-none cursor-pointer z-20 py-2.5 px-7"
        onClick={updateCompanyPreference}
        disabled={loading} // Disable the button when loading
      >
        {loading ? (
          <div className="flex justify-center">
            <Image
              alt="spinner"
              src="/spinner/loading.svg"
              width={20}
              height={20}
            />
          </div>
        ) : (
          "Update preference"
        )}
      </button>
    </div>
  );
}
