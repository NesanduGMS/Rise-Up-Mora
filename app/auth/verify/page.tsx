"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";

const Verify: React.FC = () => {
  const [message, setMessage] = useState("Verifying...");
  const [verificationComplete, setVerificationComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");

      if (!token) {
        setMessage("Invalid verification token");
        setVerificationComplete(true);
        return;
      }

      const response = await fetch(`/api/v1/user/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.message === "Email verified successfully") {
        setMessage("Email verified successfully. Redirecting to login...");
        setVerificationComplete(true);
        setTimeout(() => {
          router.push("/auth/signin"); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setMessage("Verification failed");
        setVerificationComplete(true);
      }
    };

    verifyEmail();
  }, [router]);

  useEffect(() => {
    if (verificationComplete) {
      console.log("Verification process complete.");
    }
  }, [verificationComplete]);

  return (
    <div className="grid place-content-center">
      {!verificationComplete && <PageLoader />}

      <h1 className=" font-poppins text-lg font-medium">{message}</h1>
    </div>
  );
};

export default Verify;
