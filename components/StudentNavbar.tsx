"use client"
import Image from "next/image";
import React from "react";
import PrimaryButtonSmall from "./ui/PrimaryButtonSmall";
import Link from "next/link";
import { signOut } from "next-auth/react";

const StudentNavbar = () => {

  const logoutHandler = async () => {
    
    await signOut();
    window.location.href = "/";
    
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-5 md:pt-0">
        {/* {isMobile && ( */}

        {/* )} */}
        {/* <img
          id="logostuview"
          className="max-w-48"
          src="/images/logo-large.png"
          alt="logo"
        /> */}
        <Image
          className="max-w-48"
          width={200}
          height={0}
          src="/images/logo-large.png"
          alt="logo"
        />
        <div className="flex ">
          <Link href="/">
            <PrimaryButtonSmall text="Home" />
          </Link>
          <div onClick={logoutHandler}>
          <PrimaryButtonSmall text="Signout"  />
          </div>
        </div>
        {/* {!isMobile && ( */}
        {/* <div onClick={handleSignOut}>
            <PrimaryButtonSmall text="Sign out" />
          </div> */}
        {/* )} */}
      </div>
      <div className="bg-gradient-to-r md:mt-0 mt-5 from-stv-yellow via-stv-blue to-stv-dark-blue w-full h-1.5 rounded mb-5"></div>
    </div>
  );
};

export default StudentNavbar;
