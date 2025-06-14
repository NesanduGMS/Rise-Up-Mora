import React from 'react'
import { CgFacebook } from "react-icons/cg";
import { FaLinkedinIn } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { FiInstagram } from "react-icons/fi";
import Link from 'next/link';

export default function SideNavbar() { 
  return (
    <div className='w-12 grid bg-custom-black hover:bg-white  overflow-hidden rounded-r-[20px] fixed top-1/2 transform  -translate-y-1/2 z-20 max-sm:hidden  '>
        <Link href='https://www.facebook.com/IEEEUOMSB?mibextid=b06tZ0'>
        <div className=' grid  text-center py-5 transition-all duration-300 ease text-white bg-custom-black  hover:bg-custom-yellow delay-50 cursor-pointer justify-center '>
        <CgFacebook size={22} />
        </div>
        </Link>
        <Link href='https://www.linkedin.com/company/rise-up-mora'>
        <div className=' grid text-center py-5 transition-all duration-300 ease text-white bg-custom-black  hover:bg-custom-yellow delay-50 cursor-pointer justify-center'>
        <FaLinkedinIn size={19} />
        </div>
        </Link>
        <Link href='https://site.ieee.org/sb-moratuwa/'>
        <div className=' grid text-center py-5 transition-all duration-300 ease text-white bg-custom-black  hover:bg-custom-yellow delay-50 cursor-pointer justify-center'>
        <BiWorld size={19} />
        </div>
        </Link>
        <Link href='https://instagram.com/ieeesbuom?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D'>
        <div className=' grid text-center py-5 transition-all duration-300 ease text-white bg-custom-black  hover:bg-custom-yellow delay-50 cursor-pointer justify-center'>
        <FiInstagram size={19} />
        </div>
        </Link>

      
    </div>
  )
}
