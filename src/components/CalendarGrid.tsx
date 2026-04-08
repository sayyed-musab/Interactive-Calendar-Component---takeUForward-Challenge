import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarGridProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  selectedDate: Date; // Now always a Date
  onSelectDate: (date: Date) => void;
  notes: Record<string, string>;
}

export default function CalendarGrid({
  currentDate,
  onPrevMonth,
  onNextMonth,
  selectedDate,
  onSelectDate,
  notes,
}: CalendarGridProps) {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="w-full flex flex-col">
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

      <div className="grid grid-cols-7 mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`text-center text-xs font-bold tracking-wider ${day === "SUN" || day === "SAT" ? "text-[#1a91d0]" : "text-gray-500"}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-4 gap-x-0">
        {calendarDays.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSameDay(day, selectedDate);

          // Check if this day is actually today's real-world date
          const isTodayDate = isToday(day);

          const dateKey = format(day, "yyyy-MM-dd");
          const hasNote = notes[dateKey] && notes[dateKey].trim().length > 0;

          return (
            <div
              key={idx}
              className="flex justify-center items-center h-10 relative"
            >
              {isCurrentMonth ? (
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <button
                    onClick={() => onSelectDate(day)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all
                      ${
                        isSelected
                          ? "bg-[#1a91d0] text-white shadow-md font-medium"
                          : isTodayDate
                            ? // NEW: Style for today when it is NOT selected (blue text and a blue ring)
                              "text-[#1a91d0] font-bold border border-[#1a91d0]"
                            : // Default style
                              "text-gray-700 hover:bg-gray-200 font-medium"
                      }
                    `}
                  >
                    {format(day, "d")}
                  </button>

                  {hasNote && (
                    <div className="absolute -bottom-1 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  )}
                </div>
              ) : (
                <div className="w-8 h-8 z-10"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
