"use client";

import { useState, useEffect } from "react";
import { addMonths, subMonths, format } from "date-fns";
import CalendarHero from "./CalendarHero";
import CalendarGrid from "./CalendarGrid";
import Notes from "./Notes";

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export default function WallCalendar({ themeColor }: { themeColor: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [weekStartsOn, setWeekStartsOn] = useState<DayOfWeek>(0);

  useEffect(() => {
    const savedNotes = localStorage.getItem("calendar-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleSelectDate = (date: Date) => setSelectedDate(date);

  const handleNoteChange = (text: string) => {
    if (!selectedDate) return;
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const updatedNotes = { ...notes, [dateKey]: text };
    setNotes(updatedNotes);
    localStorage.setItem("calendar-notes", JSON.stringify(updatedNotes));
  };

  const activeDateKey = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
  const currentNoteText = activeDateKey ? notes[activeDateKey] || "" : "";

  return (
    <div className="relative mt-24 w-full max-w-4xl mx-auto transition-transform duration-300">
      {/* --- TOP BINDING & WALL HANGER UI --- */}
      <div className="absolute -top-5 left-0 w-full flex justify-center pointer-events-none">
        <div className="absolute top-4 left-[6%] sm:left-[8%] right-[50%] h-0.75 bg-[#111] mr-11.25 rounded-l-full shadow-sm z-10"></div>
        <div className="absolute top-4 left-[50%] right-[6%] sm:right-[8%] h-0.75 bg-[#111] ml-11.25 rounded-r-full shadow-sm z-10"></div>
        <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 w-25 h-10 z-0">
          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            <path
              d="M 0 35.5 C 25 35.5, 40 5, 50 5 C 60 5, 75 35.5, 100 35.5"
              fill="none"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="3"
              strokeLinecap="round"
              transform="translate(0, 2)"
            />
            <path
              d="M 0 35.5 C 25 35.5, 40 5, 50 5 C 60 5, 75 35.5, 100 35.5"
              fill="none"
              stroke="#111"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1="50"
              y1="4"
              x2="50"
              y2="16"
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="blur(1px)"
            />
            <circle
              cx="50"
              cy="4"
              r="3"
              fill="#d1d5db"
              stroke="#4b5563"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="w-full flex justify-between px-4 sm:px-10 mt-3">
          <div className="flex gap-1.5 sm:gap-2.5">
            {[...Array(12)].map((_, i) => (
              <div
                key={`l-${i}`}
                className={`relative w-3.5 h-7 flex-col items-center ${i >= 8 ? "hidden sm:flex" : "flex"}`}
              >
                <div className="absolute -top-0.5 w-3.5 h-6 border-double border-[3px] border-[#333] rounded-full z-0 drop-shadow-sm"></div>
                <div className="absolute top-2.5 w-3.5 h-2.5 bg-[#7a818c] rounded-[1px] shadow-inner z-20"></div>
                <div className="absolute -top-0.5 w-3.5 h-6 border-double border-[3px] border-[#111] rounded-full z-30 drop-shadow-sm [clip-path:polygon(0_0,54%_0,100%_100%,0_100%)]"></div>
              </div>
            ))}
          </div>
          <div className="flex gap-1.5 sm:gap-2.5">
            {[...Array(12)].map((_, i) => (
              <div
                key={`r-${i}`}
                className={`relative w-3.5 h-7 flex-col items-center ${i >= 8 ? "hidden sm:flex" : "flex"}`}
              >
                <div className="absolute -top-0.5 w-3.5 h-6 border-double border-[3px] border-[#333] rounded-full z-0 drop-shadow-sm"></div>
                <div className="absolute top-2.5 w-3.5 h-2.5 bg-[#7a818c] rounded-[1px] shadow-inner z-20"></div>
                <div className="absolute -top-0.5 w-3.5 h-6 border-double border-[3px] border-[#111] rounded-full z-30 drop-shadow-sm [clip-path:polygon(0_0,54%_0,100%_100%,0_100%)]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CALENDAR BODY --- */}
      <div className="bg-white shadow-2xl rounded-b-xl rounded-t-xl overflow-hidden flex flex-col w-full relative z-10 ring-1 ring-gray-200">
        <div className="w-full h-6 bg-[#e2e6ec] border-b border-gray-300 relative z-10"></div>

        {/* Pass themeColor down */}
        <CalendarHero currentDate={currentDate} themeColor={themeColor} />

        <div className="flex flex-col-reverse md:flex-row p-6 md:p-10 gap-10 md:gap-16 bg-white">
          {/* Pass themeColor down */}
          <Notes
            activeDate={selectedDate}
            noteText={currentNoteText}
            onNoteChange={handleNoteChange}
            themeColor={themeColor}
          />
          <div className="md:w-2/3">
            {/* Pass themeColor down */}
            <CalendarGrid
              currentDate={currentDate}
              onNextMonth={handleNextMonth}
              onPrevMonth={handlePrevMonth}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              notes={notes}
              weekStartsOn={weekStartsOn}
              onWeekStartsOnChange={setWeekStartsOn}
              themeColor={themeColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
