"use client";
import CloudinaryUpload from "@/components/cloudinaryWidget";
import { useAddCompany } from "@/hooks/company/useAddCompany";
import { useGetAllCompany } from "@/hooks/company/useGetAllCompany";
import { useGetUserData } from "@/hooks/user/useGetUserData";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { data: session, status } = useSession();
  const [companyIcone, setCompanyIcone] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");

  const { company, isPending } = useGetAllCompany();
  const { addNewCompany, isUpdating } = useAddCompany();

  const userEmail = session?.user?.email;
  const userData = useGetUserData({ userEmail: userEmail || "" });

  if (userData.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
        <div className="max-w-md w-full text-center bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-4 text-gray-700">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  // if (isPending) {
  //   return;
  // }

  // const [companies, setCompanies] = useState([
  //   { id: "1", name: "Company A", logo: "https://via.placeholder.com/50" },
  //   { id: "2", name: "Company B", logo: "https://via.placeholder.com/50" },
  //   { id: "3", name: "Company C", logo: "https://via.placeholder.com/50" },
  // ]);

  // const [newCompany, setNewCompany] = useState({
  //   id: "",
  //   name: "",
  //   logo: "",
  // });

  // const handleInputChange = (e: { target: { name: any; value: any } }) => {
  //   const { name, value } = e.target;
  //   setNewCompany({
  //     ...newCompany,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    addNewCompany(
      { companyName, companyId, companyIcone },
      {
        onSuccess: () => {
          setCompanyName("");
          setCompanyId("");
          setCompanyIcone("");
          toast.success("Company added successfully");
        },
        onError: (e) => {
          console.log(e);
          toast.error("Failed to add company");
        },
      }
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/2 p-4  order-2 lg:order-2">
        <h2 className="text-l lg:text-2xl font-poppins mb-4 flex justify-center">
          Company List
        </h2>

        {isPending ? (
          <div className="flex justify-center  items-center mt-10">
            <Image
              src="/spinner/loading-black.svg"
              width={50}
              height={50}
              alt="loading"
            />
          </div>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-0 lg:px-6 py-2 lg:py-3 border-b-2 border-gray-300 text-left leading-4 text-[#0c2735] tracking-wider font-poppins">
                  ID
                </th>
                <th className="px-0 lg:px-6 py-2 lg:py-3 border-b-2 border-gray-300 text-left leading-4 text-[#0c2735] tracking-wider font-poppins">
                  Company Name
                </th>
                <th className="px-0 lg:px-6 py-2 lg:py-3 border-b-2 border-gray-300 text-left leading-4 text-[#0c2735] tracking-wider font-poppins">
                  Logo
                </th>
              </tr>
            </thead>
            <tbody>
              {company.companies.map((company: any, index: any) => (
                <tr key={index}>
                  <td className="px-4 lg:px-6 py-2 lg:py-4 whitespace-no-wrap border-b border-gray-500 font-poppins">
                    {company.company_id}
                  </td>
                  <td className="px-4 lg:px-6 py-2 lg:py-4 whitespace-no-wrap border-b border-gray-500 font-poppins">
                    {company.company_name}
                  </td>
                  <td className="px-4 lg:px-6 py-2 lg:py-4 whitespace-no-wrap border-b border-gray-500 font-poppins">
                    <img
                      src={company.company_logo}
                      alt={company.company_name}
                      className="w-8 h-8 lg:w-10 lg:h-10"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/*  */}
        {/* */}
      </div>
      <div className="lg:w-1/2 p-4 order-1 lg:order-1 px-14">
        <h2 className="text-xl lg:text-2xl font-poppins mb-4 flex justify-center">
          Add New Company
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm lg:text-base font-poppins text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 lg:py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Company Name"
            />
          </div>
          <div>
            <label className="block text-sm lg:text-base font-poppins text-gray-700">
              Company ID
            </label>
            <input
              type="text"
              name="id"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 lg:py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Company ID"
            />
          </div>
          <div>
            <label className="block text-sm lg:text-base font-poppins text-gray-700">
              Company Logo URL
            </label>
            <CloudinaryUpload
              setImgUrl={setCompanyIcone}
              type={"image"}
              croping={false}
            />

            {/* <input
              type="text"
              name="logo"
              value={newCompany.logo}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 lg:py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Logo URL"
            /> */}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-100px px-4 py-2 lg:px-6 lg:py-3 bg-[#0c2735] hover:text-[#0c2735] text-white font-poppins rounded-lg shadow-sm hover:bg-[#f1c232]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
