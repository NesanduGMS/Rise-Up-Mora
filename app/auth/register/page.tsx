"use client";
import react, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NotFound from "@/app/not-found";

export default function Page() {
  const router = useRouter();
  type Inputs = {
    username: string;
    email: string;
    password: string;
  };
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        fetch("/api/v1/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.ok) {
              resolve();
              router.push("/auth/signin");
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
        loading: "Registering...",
        success:
          "Registered successfully... Please check your email to verify your account",
        error: "Failed to register",
      }
    );
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <NotFound/>
  )
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid font-poppins place-self-center  "
    >
      <h1 className=" text-center mb-6 font-medium text-neutral-800 text-3xl ">
        Register
      </h1>
      <div className=" mb-4">
        <label htmlFor="username" className="font-medium block mb-1">
          Name
        </label>
        <input
          {...register("username", {
            required: true,
            minLength: {
              value: 3,
              message: "user name must be atleast 3 characters ",
            },
          })}
          type="text"
          name="username"
          placeholder="Enter your username"
          required
          id="username"
          className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
          style={{
            background: `linear-gradient(white, white) padding-box, 
                     linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
          }}
        />
      </div>
      <div className=" mb-4">
        <label htmlFor="email" className="font-medium block mb-1">
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@uom\.lk$/,
              message: "Please enter your UOM email",
            },
          })}
          type="email"
          name="email"
          placeholder="Enter your uom email"
          required
          id="email"
          className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
          style={{
            background: `linear-gradient(white, white) padding-box, 
                     linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="font-medium block mb-1">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            required
            id="password"
            className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
            style={{
              background: `linear-gradient(white, white) padding-box, 
                     linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
            }}
          />
          <div
            className="text-xs font-semibold cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <IoMdEye size={26} /> : <IoMdEyeOff size={26} />}
          </div>
        </div>
      </div>

      <div className="mb-4 text-red-500">
        <p>{errorMessage}</p>
        <p>
          {errors.username?.message}
          {errors.email?.message}
        </p>
      </div>

      <div className="mt-4  grid justify-center">
        <Button variant={"auth"}>Sign Up</Button>
      </div>
      <div className="text-xs flex gap-1 mt-8 justify-center ">
        <div className=" content-center">Already have an Account?</div>
        <Link href="signin" className="text-sm text-blue-400">
          Sign In
        </Link>
      </div>
    </form>
  );
}
