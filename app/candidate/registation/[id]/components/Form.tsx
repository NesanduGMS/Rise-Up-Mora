// components/Form.js

import { useForm } from "react-hook-form";
import { Candidate, RegistrationFormDataType } from "@/Type";
import { useUserRegistration } from "@/hooks/user/useUserRegistration";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CloudinaryUpload from "@/components/cloudinaryWidget";
import { checkUniId } from "@/service/checkUserId";
import Link from "next/link";

type FormProps = {
  candidate?: Candidate | null;
};

export default function Form({ candidate }: FormProps) {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormDataType>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [cvUrl, setCvUrl] = useState<string>("");

  const [uploading, setUploading] = useState<boolean>(false);
  const params = useParams();
  const userId = params.id as string;
  const router = useRouter();

  const { Registration, isPending } = useUserRegistration();

  useEffect(() => {
    if (candidate) {
      setValue("firstName", candidate.firstName || "");
      setValue("lastName", candidate.lastName || "");
      setValue("nameWithInitials", candidate.nameWithInitials || "");
      setValue("universityID", candidate.universityID || "");
      setValue("contactNo", candidate.contactNo || "");
      setValue("degree", candidate.degree || "");
      setValue("department", candidate.department || "");
      setImgUrl(candidate.imgUrl || "");
      setCvUrl(candidate.cvUrl || "");
    }
  }, [candidate, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setUploading(true);

    if (!imgUrl) {
      alert("Image is required. Please upload a photo.");
      setUploading(false);
      return;
    }
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      nameWithInitials: data.nameWithInitials,
      universityID: data.universityID,
      contactNo: data.contactNo,
      degree: data.degree,
      department: data.department,
      cvUrl: cvUrl,
      imgUrl: imgUrl,
      userId: userId,
    };

    const uniIdExist = await checkUniId({ universityID: data.universityID });

    if (uniIdExist) {
      toast.error(
        "This universityId has been used before. Please enter new ID."
      );
      setUploading(false);
      return;
    }

    Registration(
      { registrationData: userData },
      {
        onSuccess: () => {
          toast.success("Registration Success");
          reset();
          setUploading(false);
          router.push("/");
        },
        onError: () => {
          toast.error("Registration failed");
          setUploading(false);
        },
      }
    );
  });

  return (
    <div className="flex w-full  justify-center px-5 md:px-20 py-16 shadow-lg rounded-lg">
      <form onSubmit={onSubmit} className="w-full max-w-4xl">
        {/* Full Name */}
        <div className="flex  items-center flex-wrap mb-6">
          <label className="block font-poppins text-black text-md font-bold mb-2 w-full lg:w-1/4">
            Full Name <span className="text-red-600">*</span>
          </label>

          <div className="w-full md:w-8/12 flex flex-col lg:flex-row gap-2 lg:gap-6 lg:ml-10 md:ml-0  ">
            <div className="w-10/12 md:w-11/12 flex flex-col lg:w-7/12">
              <input
                type="text"
                className="w-full flex-grow   px-3 py-2  border border-gray-300 focus:outline-blue-300 font-poppins rounded-lg"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <div className="text-xs text-red-600">
                  *{errors.firstName.message}
                </div>
              )}
            </div>

            <div className="w-10/12 md:w-11/12 flex flex-col lg:w-1/2">
              <input
                type="text"
                className="w-full   px-3 py-2 border border-gray-300 focus:outline-blue-300 font-poppins rounded-lg"
                placeholder="Last Name"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <div className="text-xs text-red-600">
                  *{errors.lastName.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Name with initials */}
        <div className="flex  flex-wrap items-center mb-6">
          <label className="block font-poppins text-black text-md font-bold mb-2 w-full lg:w-1/4">
            Name with initials <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col w-4/5 lg:w-1/3 md:w-3/5  lg:ml-10 md:ml-0">
            <input
              type="text"
              className="w-full   lg:w-full px-3 py-2 border border-gray-300 focus:outline-blue-300 font-poppins rounded-lg"
              placeholder="Name with initials"
              {...register("nameWithInitials", {
                required: "Name with initials is required",
                minLength: {
                  value: 3,
                  message: "Name with initials should be at least 3 characters",
                },
              })}
            />
            {errors.nameWithInitials && (
              <div className="text-xs text-red-600">
                *{errors.nameWithInitials.message}
              </div>
            )}
          </div>
        </div>

        {/* University ID */}
        <div className="flex  flex-wrap items-center mb-6">
          <label className="block font-poppins text-black text-md font-bold mb-2 w-full lg:w-1/4">
            University ID <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col w-4/5 lg:w-1/3 md:w-3/5  lg:ml-10 md:ml-0">
            <input
              className="w-full  lg:w-full px-3 py-2 border border-gray-300 focus:outline-blue-300 font-poppins rounded-lg"
              placeholder="University ID"
              {...register("universityID", {
                required: "University ID is required",
                minLength: {
                  value: 7,
                  message: "University ID must be 7 characters long",
                },
                maxLength: {
                  value: 7,
                  message: "University ID must be 7 characters long",
                },
                validate: {
                  pattern: (value) =>
                    /^[1][9-9][0-9]{4}[a-zA-Z]$|^[2][0-2][0-9]{4}[a-zA-Z]$/.test(
                      value
                    ) || "University ID is not valid",
                },
              })}
            />
            {errors.universityID && (
              <div className="text-xs text-red-600">
                *{errors.universityID.message}
              </div>
            )}
          </div>
        </div>

        {/* Contact No */}
        <div className="flex  flex-wrap items-center mb-6">
          <label className="block font-poppins text-black text-md font-bold mb-2 w-full lg:w-1/4">
            Contact No (WhatsApp) <span className="text-red-600">*</span>
          </label>
          <div className="flex w-4/5 flex-col md:w-3/5 lg:w-1/3  lg:ml-10 md:ml-0">
            <input
              type="text"
              className="w-full  lg:w-full px-3 py-2 border border-gray-300 focus:outline-blue-300 font-poppins rounded-lg"
              placeholder="Contact No"
              {...register("contactNo", {
                required: "Contact number is required",
                minLength: {
                  value: 9,
                  message: "Contact number is not valid",
                },
                maxLength: {
                  value: 10,
                  message: "Contact number is not valid",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Contact number must be numeric",
                },
              })}
            />
            {errors.contactNo && (
              <div className="text-xs text-red-600">
                *{errors.contactNo.message}
              </div>
            )}
          </div>
        </div>

        {/* Email */}
        {/* <div className="flex flex-wrap items-center mb-6">
          <label className="block font-poppins text-black text-md font-bold mb-2 w-full lg:w-1/4">
            Email
          </label>
          <div className="flex w-4/5 flex-col md:w-3/5 lg:w-1/3  lg:ml-10 md:ml-0">
            <input
              type="email"
              disabled
              defaultValue={session.data?.user?.email as string}
              className="w-full  lg:w-full px-3 py-2 border border-gray-300 focus:outline-blue-300 font-poppins rounded-lg"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors.email && (
              <div className="text-xs text-red-600">
                *{errors.email.message}
              </div>
            )}
          </div>
        </div> */}

        {/* Degree */}
        <div className="flex flex-wrap items-center mb-6">
          <label className="block font-poppins text-black text-md font-bold mb-2 w-full lg:w-1/4">
            Degree <span className="text-red-600">*</span>
          </label>

          <div className="flex w-4/5 flex-col lg:w-1/3 md:w-3/5 lg:ml-10 md:ml-0">
            <select
              className="w-full   px-3 py-2 border border-gray-300 focus:outline-blue-300 font-poppins rounded-lg"
              {...register("degree", { required: "Degree is required" })}
            >
              <option value="">None</option>
              <option value="B.Sc. Eng(Hons) in Civil Engineering">
                B.Sc. Eng(Hons) in Civil Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Mechanical Engineering">
                B.Sc. Eng(Hons) in Mechanical Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Computer Science & Engineering">
                B.Sc. Eng(Hons) in Computer Science & Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Electrical Engineering">
                B.Sc. Eng(Hons) in Electrical Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Electronic & Telecommunication Engineering">
                B.Sc. Eng(Hons) in Electronic & Telecommunication Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Material Science & Engineering">
                B.Sc. Eng(Hons) in Material Science & Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Chemical & Process Engineering">
                B.Sc. Eng(Hons) in Chemical & Process Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Textile & Apparel Engineering">
                B.Sc. Eng(Hons) in Textile & Apparel Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Earth Resource Engineering">
                B.Sc. Eng(Hons) in Earth Resource Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Bio Medical Engineering">
                B.Sc. Eng(Hons) in Bio Medical Engineering
              </option>
              <option value="B.Sc. Eng(Hons) in Transport Management & Logistics Engineering">
                B.Sc. Eng(Hons) in Transport Management & Logistics Engineering
              </option>
              <option value="BSc (Hons) in IT">BSc (Hons) in IT</option>
              <option value="BSc (Hons) in IT & Management">
                BSc (Hons) in IT & Management
              </option>
              <option value="BSc (Hons) in AI">BSc (Hons) in AI</option>
            </select>
            {errors.degree && (
              <div className="text-xs text-red-600">
                *{errors.degree.message}
              </div>
            )}
          </div>
        </div>

        {/* Department */}
        <div className="flex flex-wrap items-center mb-6">
          <label className="block font-poppins text-black text-md font-bold mb-2 w-full lg:w-1/4">
            Department <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col  w-4/5 lg:w-1/3 md:w-3/5 lg:ml-10 md:ml-0">
            <select
              className="w-full  px-3 py-2 border border-gray-300 focus:outline-blue-300 font-poppins rounded-lg"
              {...register("department", {
                required: "Department is required",
              })}
            >
              <option value="">None</option>

              <option value="Electronic_and_Telecommunication_Engineering">
                Electronic and Telecommunication Engineering
              </option>
              <option value="Electrical_Engineering">
                Electrical Engineering
              </option>
              <option value="Mechanical_Engineering">
                Mechanical Engineering
              </option>
              <option value="Civil_Engineering">Civil Engineering</option>
              <option value="Material_Science_and_Engineering">
                Material Science Engineering
              </option>
              <option value="Chemical_and_Process_Engineering">
                Chemical and Process Engineering
              </option>
              <option value="Transport_Management_and_Logistics_Engineering">
                Transport Management and Logistics Engineering
              </option>
              <option value="Textile_and_Apparel_Engineering">
                Textile and Apparel Engineering
              </option>
              <option value="Earth_Resources_Engineering">
                Earth Resource Engineering
              </option>
              <option value="Computer_Science_and_Engineering">
                Computer Science & Engineering
              </option>
              <option value="Information_Technology">
                Information Technology
              </option>
              <option value="Interdisciplinary_Studies">
                Interdisciplinary Study
              </option>
              <option value="Computational_Mathematics">
                Computational Mathematics
              </option>
            </select>
            {errors.department && (
              <div className="text-xs text-red-600">
                *{errors.department.message}
              </div>
            )}
          </div>
        </div>

        {/* CV Upload */}
        <div className="flex flex-wrap  mb-6">
          <label className="block font-poppins text-black text-md font-bold mb-2 w-full lg:w-1/4">
            Upload your CV (in PDF form)
          </label>
          <div className="lg:w-1/3 w-4/5 md:w-3/5 lg:ml-10 md:ml-0">
            {/* <Input
              className="w-full    border-gray-300 rounded-lg"
              // onChange={handleFileChange}
              type="file"
              {...register("cv", {
                required: "CV is required",
                validate: {
                  fileType: (value) =>
                    value[0]?.type === "application/pdf" ||
                    "Only PDF files are allowed",
                },
              })}
            /> */}
            <CloudinaryUpload croping={true} setImgUrl={setCvUrl} type={"cv"} />
            {/* <div className=" text-xs mt-2 font-light">*Optional</div> */}
            {errors.cv && (
              <div className="text-xs text-red-600">*{errors.cv.message}</div>
            )}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="flex flex-wrap  mb-6">
          <label className="block font-poppins text-black text-md font-bold mb-2 w-full lg:w-1/4">
            <div className="">
              Upload a Formal Photo of Yourself{" "}
              <span className="text-red-600">*</span>
            </div>
          </label>
          <div className="lg:w-1/3 w-4/5 md:w-3/5 lg:ml-10 md:ml-0">
            <CloudinaryUpload
              croping={true}
              setImgUrl={setImgUrl}
              type={"image"}
            />
            <div className=" text-xs mt-2 font-light">
              *Uploaded images will be visible to companies conducting
              interviews.
            </div>
            {errors.photo && (
              <div className="text-xs text-red-600">
                *{errors.photo.message}
              </div>
            )}
          </div>
        </div>

        {/* Register Button */}

        {candidate ? (
          <Link href="/" className="flex  justify-center md:justify-end mt-6">
            <button
              className={`w-4/5 md:w-1/3 lg:w-1/4 p-3 bg-[#0c2735] text-white font-bold rounded-full `}
            >
              Home
            </button>
          </Link>
        ) : (
          <div className="flex  justify-center md:justify-end mt-6">
            <button
              onSubmit={onSubmit}
              type="submit"
              className={`w-4/5 md:w-1/3 lg:w-1/4 p-3 bg-[#0c2735] text-white font-bold rounded-full `}
            >
              {uploading || isPending ? (
                <div className="w-full flex justify-center items-center">
                  <Image
                    src="/spinner/loading.svg"
                    width={28}
                    height={28}
                    alt="spinner"
                  />
                </div>
              ) : (
                " Register"
              )}
            </button>
          </div>
        )}

        {/* <div className="mt-5 bg-red-200 rounded-lg">
          <Alert className="border-red-300" variant="destructive">
            <div className=" flex items-center gap-4">
              <AlertCircle className="h-8 w-8 text-red-800" />
              <AlertTitle className="text-lg">Something went wrong</AlertTitle>
            </div>
          </Alert>
        </div>

        <div className="mt-5 bg-green-200 rounded-lg">
          <Alert className="border-green-300" variant="destructive">
            <div className=" flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-check-circle-fill h-8 w-8 text-green-500 me-3"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <AlertTitle className="text-lg"> Registration Success</AlertTitle>
            </div>
          </Alert>
        </div> */}
      </form>
    </div>
  );
}
