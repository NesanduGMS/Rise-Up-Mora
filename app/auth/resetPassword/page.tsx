"use client";
import react, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordResetToken, setPasswordResetToken] = useState("");
  useEffect(() => {
    const getToken = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");

      if (token) {
        setPasswordResetToken(token);
      }
    };
    getToken();
  });
  type Inputs = {
    newPassword: string;
    newPasswordConfirm: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        if (data.newPassword != data.newPasswordConfirm) {
          setErrorMessage("Passwords do not match.");
          reject();
          return;
        }
        if (passwordResetToken == "") {
          setErrorMessage("invalid reset token");
        }

        fetch("/api/v1/user/resetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data, passwordResetToken }),
        })
          .then((res) => {
            if (res.ok) {
              resolve();
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
        loading: "loading...",
        success:
          "password reset successful, you can now login with your new password",
        error: "Failed to reset password",
      }
    );
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid font-poppins place-self-center  "
    >
      <h1 className=" text-center mb-6 font-medium text-neutral-800 text-3xl ">
        Reset password
      </h1>

      <div className="mb-4">
        <label htmlFor="password" className="font-medium block mb-1">
          Password
        </label>
        <div className="relative">
          <input
            {...register("newPassword", { required: "Password is required" })}
            type={passwordVisible ? "text" : "password"}
            name="newPassword"
            placeholder="Enter new password"
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
      <div className="mb-4">
        <label htmlFor="password" className="font-medium block mb-1">
          confirm Password
        </label>
        <div className="relative">
          <input
            {...register("newPasswordConfirm", {
              required: "Password is required",
            })}
            type={confirmPasswordVisible ? "text" : "password"}
            name="newPasswordConfirm"
            placeholder="Enter new password"
            required
            id="newPasswordConfirm"
            className="w-full py-4 sm:py-3 pl-5 border-transparent rounded-full border-gray-300  border-2 placeholder:text-stone-500"
            style={{
              background: `linear-gradient(white, white) padding-box, 
                     linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
            }}
          />
          <div
            className="text-xs font-semibold cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            {confirmPasswordVisible ? (
              <IoMdEye size={26} />
            ) : (
              <IoMdEyeOff size={26} />
            )}
          </div>
        </div>
      </div>

      <div className="mb-4 text-red-500">
        <p>{errorMessage}</p>
        <p>{errors.newPassword?.message}</p>
      </div>

      <div className="mt-4  grid justify-center">
        <Button variant={"auth"}>Reset Password</Button>
      </div>
    </form>
  );
}
