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

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface CalendarGridProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  notes: Record<string, string>;
  weekStartsOn: DayOfWeek;
  onWeekStartsOnChange: (day: DayOfWeek) => void;
  themeColor: string; // NEW
}

export default function CalendarGrid({
  currentDate,
  onPrevMonth,
  onNextMonth,
  selectedDate,
  onSelectDate,
  notes,
  weekStartsOn,
  onWeekStartsOnChange,
  themeColor,
}: CalendarGridProps) {
  const baseDaysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const displayDaysOfWeek = [
    ...baseDaysOfWeek.slice(weekStartsOn),
    ...baseDaysOfWeek.slice(0, weekStartsOn),
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn });
  const endDate = endOfWeek(monthEnd, { weekStartsOn });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
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

      <div className="flex justify-end items-center mb-6">
        <label className="text-[10px] text-gray-400 uppercase tracking-wider mr-2">
          Start Week On:
        </label>
        <select
          value={weekStartsOn}
          onChange={(e) =>
            onWeekStartsOnChange(Number(e.target.value) as DayOfWeek)
          }
          className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:outline-none cursor-pointer"
          style={{ outlineColor: themeColor }} // Dynamic focus outline
        >
          <option value={0}>Sunday</option>
          <option value={1}>Monday</option>
          <option value={6}>Saturday</option>
        </select>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {displayDaysOfWeek.map((day) => (
          <div
            key={day}
            className={`text-center text-xs font-bold tracking-wider ${day === "SUN" || day === "SAT" ? "" : "text-gray-500"}`}
            // NEW: Dynamic Weekend Colors
            style={day === "SUN" || day === "SAT" ? { color: themeColor } : {}}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-4 gap-x-0">
        {calendarDays.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSameDay(day, selectedDate);
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
                          ? "text-white shadow-md font-medium"
                          : isTodayDate
                            ? "font-bold border"
                            : "text-gray-700 hover:bg-gray-200 font-medium"
                      }
                    `}
                    // NEW: Dynamic background for selected, and text/border for today
                    style={
                      isSelected
                        ? { backgroundColor: themeColor }
                        : isTodayDate
                          ? { color: themeColor, borderColor: themeColor }
                          : {}
                    }
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
