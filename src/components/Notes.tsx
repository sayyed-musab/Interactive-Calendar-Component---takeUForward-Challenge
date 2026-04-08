import { format } from "date-fns";

interface NotesProps {
  activeDate: Date;
  noteText: string;
  onNoteChange: (text: string) => void;
  themeColor: string;
}

export default function Notes({
  activeDate,
  noteText,
  onNoteChange,
  themeColor,
}: NotesProps) {
  if (!activeDate) {
    return (
      <div className="md:w-1/3 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 min-h-62.5">
        <p>Select a date on the calendar to add or view notes.</p>
      </div>
    );
  }

  return (
    <div className="md:w-1/3 flex flex-col">
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wider">
          Notes
        </h3>
        {/* Apply dynamic theme color to the text */}
        <span className="font-semibold text-sm" style={{ color: themeColor }}>
          {format(activeDate, "MMM do, yyyy")}
        </span>
      </div>

      <textarea
        value={noteText}
        onChange={(e) => onNoteChange(e.target.value)}
        className="flex-1 min-h-62.5 w-full resize-none border-0 focus:ring-0 p-0 text-sm leading-10 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] focus:outline-none text-gray-700"
        placeholder="Jot down details for this day..."
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 39px, #e5e7eb 39px, #e5e7eb 40px)",
          lineHeight: "40px",
        }}
      ></textarea>
    </div>
  );
}
