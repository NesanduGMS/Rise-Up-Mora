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
  const galleryref = useRef<HTMLDivElement>(null);
  const contactUsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = {
    heroSectionRef,
    aboutRef,
    timelineRef,
    contactUsRef,
  };
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div>
      <Navbar sectionRefs={sectionRefs} />
      <SideNavbar />
      <div className=" fixed bottom-0 bg-custom-yellow w-full z-40 h-4"></div>
      <div ref={heroSectionRef}>
        <HeroSection />
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={timelineRef}>
        <Timeline />
      </div>
      <Partners />
      <div ref={galleryref}>
        <Gallery />
      </div>
      <div ref={contactUsRef}>
        <CountactUs />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
