'use client'
import { Button } from "@/components/ui/button";
import React,{useState} from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const Page = () => {
  type Inputs = {
    email: string,
  };
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        fetch("/api/v1/user/requestResetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
        success: "Password reset link sent to your email",
        error: "Failed to reset password"
      }
    )
  }
  return <form onSubmit={handleSubmit(onSubmit)} className="grid font-poppins place-self-center  " >
  <h1 className=" text-center mb-6 font-medium text-neutral-800 text-3xl ">
  Reset Password
  </h1>
  <div className=" mb-6">
    <label htmlFor="email" className="font-medium block mb-1">
      Email
    </label>
    <input
      {...register("email")}
      type="email"
      name="email"
      placeholder="Enter your email"
      required
      id="email"
      className="w-full  pl-5 border-transparent py-4 sm:py-3 rounded-full border-gray-300  border-2 placeholder:text-stone-500"
     
    style={{
      background: `linear-gradient(white, white) padding-box, 
                   linear-gradient(90deg, rgba(241, 194, 50, 1) 5%, rgba(40, 168, 224, 1) 20%, rgba(12, 39, 53, 1) 40%, rgba(12, 39, 53, 1) 60%, rgba(40, 168, 224, 1) 80%, rgba(241, 194, 50, 1) 95%) border-box`,
    }}
    />
  </div>
  
  {errorMessage && (
    <div className="mb-4 text-red-500">
      <p>{errorMessage}</p>
    </div>
  )}
  
  <div className="mb-4  grid justify-center">
    <Button variant={"auth"}>
      Reset</Button>
  </div>
</form>;
};

export default Page;
