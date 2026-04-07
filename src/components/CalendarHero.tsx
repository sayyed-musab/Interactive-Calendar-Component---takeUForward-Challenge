import { format } from "date-fns";

interface CalendarHeroProps {
  currentDate: Date;
}

export default function CalendarHero({ currentDate }: CalendarHeroProps) {
  return (
    <div
      className="relative w-full h-75 sm:h-112 bg-[#1a91d0] overflow-hidden"
      style={{
        // This shapes the bottom edge of the ENTIRE blue container
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 22% 80%, 0 95%)",
      }}
    >
      {/* Main Image */}
      <img
        src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1000&auto=format&fit=crop"
        alt="Premium Superbike"
        className="absolute inset-0 w-full h-full object-cover opacity-95"
        style={{
          // This cuts the bottom corners of the image to reveal the blue wrapper behind it
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 50% 100%, 0 65%)",
        }}
      />

      {/* Month and Year Text */}
      <div className="absolute bottom-[15%] right-[5%] text-right text-white z-10">
        <div className="text-2xl md:text-3xl font-light tracking-widest mb-1">
          {format(currentDate, "yyyy")}
        </div>
        <div className="text-3xl md:text-5xl font-black uppercase tracking-wider">
          {format(currentDate, "MMMM")}
        </div>
      </div>
    </div>
  );
}
