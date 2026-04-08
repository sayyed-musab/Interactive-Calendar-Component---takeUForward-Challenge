"use client";

import { format } from "date-fns";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CalendarHeroProps {
  currentDate: Date;
  themeColor: string;
}

export default function CalendarHero({
  currentDate,
  themeColor,
}: CalendarHeroProps) {
  // Provide a static default image for the Server-Side Render (SSR) to prevent mismatches
  const [activeImage, setActiveImage] = useState("/calendar-hero-images/1.jpg");

  // Generate the random image ONLY on the client after the component mounts
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    setActiveImage(`/calendar-hero-images/${randomNum}.jpg`);
  }, [currentDate]); // The dependency array ensures it picks a new image when you change the month

  return (
    <div
      className="relative w-full h-75 sm:h-112 bg-[#1a91d0] overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: themeColor,
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 22% 80%, 0 95%)",
      }}
    >
      <Image
        src={activeImage}
        alt={`${format(currentDate, "MMMM")} Calendar Hero`}
        className="absolute inset-0 w-full h-full object-cover opacity-95 transition-opacity duration-500"
        fill={true}
        loading="eager"
        sizes="(max-width: 896px) 100vw, 896px"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 35%, 50% 100%, 0 65%)",
        }}
      />

      <div className="absolute bottom-[15%] right-[3%] text-right text-white z-10">
        <div className="text-2xl md:text-3xl font-light tracking-widest mb-1">
          {format(currentDate, "yyyy")}
        </div>
        <div className="text-2xl md:text-4xl font-black uppercase tracking-wider drop-shadow-md">
          {format(currentDate, "MMMM")}
        </div>
      </div>
    </div>
  );
}
