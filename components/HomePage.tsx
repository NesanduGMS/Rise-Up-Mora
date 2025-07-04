"use client";
import React, { useRef } from "react";
import HeroSection from "./HeroSection";
import About from "./About";
import Timeline from "./Timeline";
import Partners from "./Partners";
import CountactUs from "./CountactUs";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { MutableRefObject } from "react";
import SideNavbar from "./ui/SideNavbar";
import { useSession, signIn, signOut } from "next-auth/react";
import Gallery from "./gallery";

const HomePage = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null); // 1. Add ref for Partners
  const galleryRef = useRef<HTMLDivElement>(null);  // 2. Correct typo from galleryref to galleryRef
  const contactUsRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    heroSectionRef,
    aboutRef,
    timelineRef,
    partnerRef,   // 3. Pass partnerRef to the Navbar
    galleryRef,   // 4. Pass galleryRef to the Navbar
    contactUsRef,
  };
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div>
      <Navbar sectionRefs={sectionRefs} />
      <SideNavbar />
      <div className=" fixed bottom-0 bg-custom-yellow w-full z-40 h-4"></div>
      {/* Add `id` attributes for scroll-spy functionality */}
      <div id="home" ref={heroSectionRef}>
        <HeroSection />
      </div>
      <div id="about" ref={aboutRef}>
        <About />
      </div>
      <div id="timeline" ref={timelineRef}>
        <Timeline />
      </div>
      {/* 5. Wrap Partners component and assign the ref and id */}
      <div id="partner" ref={partnerRef}>
        <Partners />
      </div>
      {/* 6. Assign the corrected ref and id to Gallery */}
      <div id="gallery" ref={galleryRef}>
        <Gallery />
      </div>
      <div id="contact" ref={contactUsRef}>
        <CountactUs />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
