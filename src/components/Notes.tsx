import { format } from "date-fns";

interface NotesProps {
  activeDate: Date;
  noteText: string;
  onNoteChange: (text: string) => void;
}

export default function Notes({
  activeDate,
  noteText,
  onNoteChange,
}: NotesProps) {
  return (
    <div className="md:w-1/3 flex flex-col">
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wider">
          Notes
        </h3>
        <span className="text-[#1a91d0] font-semibold text-sm">
          {format(activeDate, "MMM do, yyyy")}
        </span>
      </div>

      <textarea
        value={noteText}
        onChange={(e) => onNoteChange(e.target.value)}
        className="flex-1 min-h-62 w-full resize-none border-0 focus:ring-0 p-0 text-sm leading-10 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] focus:outline-none text-gray-700"
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
