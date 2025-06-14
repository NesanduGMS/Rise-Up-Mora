import Image from "next/image";
import React from "react";
import ColorLine from "./ColorLine";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="sm:grid grid-cols-12  bg-white sm:h-4/5 sm:w-11/12 xl:w-[55%] rounded-[20px] sm:shadow-custom-shadow overflow-hidden">
      <div className=" grid items-center justify-center col-span-5 px-24 sm:px-16 md:px-12">
      <Image
        className="sm:mt-12"
          src="/images/navbar-logo-large.png"
          width={500}
          height={500}
          alt="riseUpMoraLogo"
          quality={100}
        />

      </div>
      <div className=" sm:flex col-span-7 ">
        <div className=" max-sm:hidden ">
        <ColorLine />
        </div>
        <div className="  w-full grid max-sm:mt-12 px-5  ">
        {children}</div></div>
    </div>
    </div>
  );
};

export default layout;
