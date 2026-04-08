"use client";

import { useState, useEffect } from "react";
import { addMonths, subMonths, format } from "date-fns";
import CalendarHero from "./CalendarHero";
import CalendarGrid from "./CalendarGrid";
import Notes from "./Notes";

export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // UPDATED: Set the default selected date to today right when it loads
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedNotes = localStorage.getItem("calendar-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

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
    <div className="bg-white shadow-2xl rounded-b-xl overflow-hidden flex flex-col w-full">
      <CalendarHero currentDate={currentDate} />

      <div className="flex flex-col-reverse md:flex-row p-6 md:p-10 gap-10 md:gap-16 bg-white">
        <Notes
          activeDate={selectedDate}
          noteText={currentNoteText}
          onNoteChange={handleNoteChange}
        />
        <div className="md:w-2/3">
          <CalendarGrid
            currentDate={currentDate}
            onNextMonth={handleNextMonth}
            onPrevMonth={handlePrevMonth}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            notes={notes}
          />
        </div>
      </div>
    </div>
  );
}
