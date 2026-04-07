"use client";

import { useState } from "react";
import CalendarHero from "./CalendarHero";

export default function WallCalendar() {
  // State lives here in the main component to pass down to Hero, Notes, and Grid
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="bg-white shadow-2xl rounded-b-xl overflow-hidden flex flex-col w-full">
      {/* Hero Component */}
      <CalendarHero currentDate={currentDate} />

      {/* The Notes and Dates Layout*/}
      <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8 md:gap-12 bg-white">
        <div className="w-full text-center text-gray-400 py-12">
          Notes and Dates components coming next...
        </div>
      </div>
    </div>
  );
}
