"use client";

import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import CalendarHero from "./CalendarHero";
import CalendarGrid from "./CalendarGrid";

export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="bg-white shadow-2xl rounded-b-xl overflow-hidden flex flex-col w-full">
      <CalendarHero currentDate={currentDate} />

      {/* Two-Column Layout for Desktop, Stacked on Mobile */}
      <div className="flex flex-col md:flex-row p-6 md:p-10 gap-10 md:gap-16 bg-white">
        {/* LEFT: Notes Placeholder */}
        <div className="md:w-1/3 flex flex-col">
          <div className="w-full h-full min-h-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
            Notes Component Next...
          </div>
        </div>

        {/* RIGHT: Calendar Grid */}
        <div className="md:w-2/3">
          <CalendarGrid
            currentDate={currentDate}
            onNextMonth={handleNextMonth}
            onPrevMonth={handlePrevMonth}
          />
        </div>
      </div>
    </div>
  );
}
