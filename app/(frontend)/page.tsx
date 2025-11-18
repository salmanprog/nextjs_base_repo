"use client";
import { useEffect, useState } from "react";
import Sec from "@/components/home/Sec";
import Image from "next/image";
export default function HomePage() {
  const images = [
    "/images/home/hero-bg.png",
    "/images/home/hero/01.jpg",
    "/images/home/hero/02.jpg",
    "/images/home/hero/03.jpg",
    "/images/home/hero/04.jpg",
    "/images/home/hero/05.jpg",
    "/images/home/hero/06.jpg",
    "/images/home/hero/07.jpg",
    "/images/home/hero/08.jpg",
    "/images/home/hero/09.jpg",
    "/images/home/hero/10.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * images.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images Layer */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            style={{
              backgroundImage: `url(${img})`,
            }}
          />
        ))}

        {/* Content Layer */}
        <div className="text-center text-white">
          <div className="container">
            <div className="hero-content relative z-10 max-w-[960px] mx-auto mb-[25px] 2xl:mb-[100px]">
              <h1 className="hd-lg text-center">Thornton Studios</h1>
              <span className="block text-end text-[28px] max-w-[370px] ml-auto font-[var(--font-primary-font)]">
                Serving the Naval Academy for over 45 years
              </span>
            </div>
            {/* <span className="">
            </span> */}
            <div className="hero-bottom-content group inline-block">
              <button className="">
                <Image src="/images/logo.png" alt="" width={100} height={100} />
              </button>

              <span className="
      absolute left-[-760px] mt-2
      px-3 py-1 text-sm text-white bg-black rounded
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300
      pointer-events-none
      whitespace-nowrap text-left
    ">
                NABSD is the Naval Academy Business Service Division of
                the Naval Academy and approves all vendors. Since 1980 <br />
                Thornton Studios has been photographing Plebe Sum-
                mer, and is only approved Vendor to Plebe Summer.
              </span>
            </div>
          </div>
        </div>

        {/* Overlay for dark effect (optional) */}
        <div className="absolute inset-0 bg-black/30 z-[5]"></div>
      </section>
      {/* add slug link */}
      <Sec title="Sea Trials / Herndon" sectionClass="home-sec-2" href="/products" />
      <Sec title="Graduations / Commissioning" sectionClass="home-sec-3" href="/products" />
      <Sec title="Plebe Summer" sectionClass="home-sec-4" href="/products" />
      <Sec title="Studio Collection" sectionClass="home-sec-5" href="/products" />
    </>
  )
}
