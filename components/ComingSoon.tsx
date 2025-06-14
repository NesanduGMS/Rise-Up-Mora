import React from 'react'
import SideNavbar from './ui/SideNavbar'
import Image from 'next/image'

export default function ComingSoon() {
  return (
    <div className='h-screen grid   place-content-center'>
        <SideNavbar />
        <Image
        className=""
        src="/images/navbar-logo-large.png"
        width={500}
        height={500}
        alt="riseUpMoraLogo"
      />
      <div className='h-[2px] my-10 max-sm:w-2/3 w-full mx-auto  bg-red-600'></div>

      <div className=" font-poppins text-center text-3xl font-medium">
        COMING SOON!
      </div>
      <div className="font-poppins text-center text-lg">
        Rise Up Mora 24
      </div>

      <div className="grid gap-3 justify-center mt-10">
        <span className="w-[30px] h-[30px] block border-r-[5px] border-b-[5px] border-custom-yellow transform rotate-45 -m-[10px] animate-animate"></span>
        <span
          className="w-[30px] h-[30px] block border-r-[5px] border-b-[5px] border-custom-yellow transform rotate-45 -m-[10px] animate-animate"
          style={{ animationDelay: "-0.2s" }}
        ></span>
        <span
          className="w-[30px] h-[30px] block border-r-[5px] border-b-[5px] border-custom-yellow transform rotate-45 -m-[10px] animate-animate"
          style={{ animationDelay: "-0.4s" }}
        ></span>
      </div>


      
    </div>
  )
}
