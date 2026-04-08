import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarGridProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarGrid({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: CalendarGridProps) {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Calculate the dates to show on the grid
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  // We start the week on Sunday to match standard calendars (or change to Monday if you prefer)
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return (
    <div className="w-full flex flex-col">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <span className="font-semibold text-gray-800 text-lg uppercase tracking-widest">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Grid Header (Days of Week) */}
      <div className="grid grid-cols-7 mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`text-center text-xs font-bold tracking-wider ${
              day === "SUN" || day === "SAT"
                ? "text-[#1a91d0]"
                : "text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid Body (Dates) */}
      <div className="grid grid-cols-7 gap-y-4 gap-x-1">
        {calendarDays.map((day, idx) => {
          // Check if the day actually belongs to the current month
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <div key={idx} className="flex justify-center items-center h-10">
              {isCurrentMonth ? (
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                  {format(day, "d")}
                </button>
              ) : (
                // Empty space for days from previous/next months
                <div className="w-8 h-8"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
