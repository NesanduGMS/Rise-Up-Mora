"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import PageLoader from "../../../components/PageLoader";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  type Inputs = {
    email: string;
    password: string;
  };
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // useEffect(() => {
  //   setLoading(true);

  //   async function checkSession() {
  //     if (status === "unauthenticated") {
  //       setLoading(false);
  //       return;
  //     }

  // if (status === "authenticated") {
  //   const res = await fetch("/api/v1/user/getOneUser", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: session.user?.email,
  //     }),
  //   });
  //   if (!res.ok) {

  //     return;
  //   }
  //   const { data } = await res.json();
  //   if (!data) return;

  // }
  // if (status === "authenticated") {
  //   router.push("/");
  // }
  // }
  //   checkSession();
  // }, [status, session, router]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      new Promise<void>(async (resolve, reject) => {
        fetch("/api/v1/user/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(async (res) => {
            if (res.ok) {
              const signInData = await res.json();

              const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
              });
              if (result?.ok) {
                if (
                  !signInData.isCandidate &&
                  signInData.role === "candidate"
                ) {
                  router.push(`/candidate/registation/${signInData.id}`);
                } else if (
                  signInData.isCandidate &&
                  signInData.role === "candidate"
                ) {
                  router.push(`/`);
                } else if (signInData.role === "admin") {
                  router.push(`/admin/add-company/`);
                } else if (signInData.role === "departmentCoordinator") {
                  router.push(`/admin/department-coordinator/${signInData.id}`);
                } else if (signInData.role === "companyCoordinator") {
                  router.push(`/admin/company-coordinator/${signInData.id}`);
                } else if (signInData.role === "panelist") {
                  router.push(`/company/dashboard/${signInData.id}`);
                } else {
                  router.push(`/`);
                }
              }
              resolve();
            } else {
              res.json().then((data) => {
                setErrorMessage(data.message);
                reject();
                return;
              });
            }
          })
          .catch((error) => {
            reject(error);
          });
      }),
      {
        loading: "Signing in...",
        success: "Signed in successfully",
        error: "Failed to sign in",
      }
    );
  };

  return (
    <>
      {/* {loading && <PageLoader />} */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid font-poppins place-self-center  "
      >
        <h1 className=" text-center mb-6 font-medium text-neutral-800 text-3xl ">
          Sign In
        </h1>
        <div className=" mb-6">
          <label htmlFor="email" className="font-medium block mb-1">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            name="email"
            placeholder="Enter your email"
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
              {...register("password", { required: true })}
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your passsword"
              // required
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
              {passwordVisible ? (
                <IoMdEye size={26} />
              ) : (
                <IoMdEyeOff size={26} />
              )}
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className="mb-4 text-red-500">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="mb-4">
          <Link href="reset-password-request">
            <div className="text-center text-xs font-semibold hover:underline">
              Forgot password? Click Here!
            </div>
          </Link>
        </div>
        <div className="mb-4  grid justify-center">
          <Button variant={"auth"}>Sign In</Button>
        </div>
        {/* <div className="mb-4">
          <Link href="/auth/register">
            <div className="text-center text-xs font-semibold hover:underline">
              If you dont have an account? register!
            </div>
          </Link>
        </div> */}
      </form>
    </>
  );
};

export default SignIn;
