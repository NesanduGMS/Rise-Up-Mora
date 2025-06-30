"use client";
import PageLoader from "@/components/PageLoader";
import { useGetUserData } from "@/hooks/user/useGetUserData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import toast from "react-hot-toast";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState("");

  const departmentList = [
    { dept_name: "Electronic_and_Telecommunication_Engineering", dept_id: 1 }, // B.Sc. Eng(Hons) in Civil Engineering
    { dept_name: "Electrical_Engineering", dept_id: 2 }, // B.Sc. Eng(Hons) in Mechanical Engineering
    { dept_name: "Mechanical_Engineering", dept_id: 3 }, // B.Sc. Eng(Hons) in Computer Science & Engineering
    { dept_name: "Civil_Engineering", dept_id: 4 }, // B.Sc. Eng(Hons) in Electrical Engineering
    { dept_name: "Material_Science_and_Engineering", dept_id: 5 }, // B.Sc. Eng(Hons) in Electronic & Telecommunication Engineering
    { dept_name: "Chemical_and_Process_Engineering", dept_id: 6 }, // B.Sc. Eng(Hons) in Material Science & Engineering
    { dept_name: "Transport_Management_and_Logistics_Engineering", dept_id: 7 }, // B.Sc. Eng(Hons) in Chemical & Process Engineering
    { dept_name: "Textile_and_Apparel_Engineering", dept_id: 8 }, // B.Sc. Eng(Hons) in Textile & Apparel Engineering
    { dept_name: "Earth_Resources_Engineering", dept_id: 9 }, // B.Sc. Eng(Hons) in Earth Resource Engineering
    { dept_name: "Computer_Science_and_Engineering", dept_id: 10 }, // Assuming closest match for Bio Medical Engineering
    { dept_name: "Information_Technology", dept_id: 11 }, // B.Sc. Eng(Hons) in Transport Management & Logistics Engineering
    { dept_name: "Interdisciplinary_Studies", dept_id: 12 }, // BSc (Hons) in IT
    { dept_name: "Computational_Mathematics", dept_id: 13 }, // BSc (Hons) in IT & Management
  ];
  type Inputs = {
    coordinatorName: string;
    departmentName: string;
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Inputs>();

  const { data: session, status } = useSession();

  const userEmail = session?.user?.email;
  const userData = useGetUserData({ userEmail: userEmail || "" });
  const role = userData.user?.role;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        fetch("/api/v1/admin/addDepCoordinator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.ok) {
              resolve();
              setErrorMessage("");
              reset();
            } else {
              res.json().then((data) => {
                setErrorMessage(data.message);
                reject();
              });
            }
          })
          .catch((error) => {
            reject(error);
          });
      }),
      {
        loading: "Pending request...",
        success: "Coordinator added successfully",
        error: "Failed to add coordinator",
      }
    );
  };

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

  if (status === "loading" || userData.isPending) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-0">
      <div className="absolute top-0 left-0 m-5 sm:m-10">
        <div className="relative">
          <div className="absolute bg-[#0c2735] text-white font rounded-[10px] border-none cursor-pointer z-10 py-2 px-4 sm:py-2 sm:px-5 top-4 left-4">
            <div className="font-poppins text-[20px] sm:text-[30px] md:text-[40px] line-height-1">
              Registration
            </div>
          </div>
          <div className="absolute top-1 left-0 mt-6 ml-1.5 sm:mt-8 sm:ml-3 bg-[#f1c232] text-[#f1c232] rounded-[10px] border-none py-2 cursor-pointer h-[40px] w-[150px] sm:w-[270px] sm:h-[70px]"></div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-5 sm:p-10 max-w-lg w-full sm:max-w-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="coordinatorName"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Coordinator Name
            </label>
            <input
              {...register("coordinatorName", {
                required: {
                  value: true,
                  message: "Coordinator Name is required",
                },
                minLength: {
                  value: 3,
                  message: "coordinater name must be atleast 3 characters ",
                },
                maxLength: 20,
              })}
              id="coordinatorName"
              type="text"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Coordinator Name"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="departmentName"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Department Name
            </label>
            <select
              id="departmentName"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("departmentName", {
                required: { value: true, message: "Department is required" },
              })}
            >
              <option value="">-- Select a Department --</option>
              {departmentList.map((department) => (
                <option key={department.dept_id} value={department.dept_name}>
                  {department.dept_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="email"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="password"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "password must be atleast 6 characters ",
                },
                maxLength: 20,
              })}
              type="password"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
          </div>
          <div className="mb-4 text-red-500">
            <p>
              {errors.coordinatorName?.message ||
                errors.departmentName?.message ||
                errors.email?.message ||
                errors.password?.message ||
                errorMessage}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-6 border border-transparent shadow-sm text-lg font-medium rounded-full text-white bg-[#0c2735] hover:bg-[#f1c232] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
