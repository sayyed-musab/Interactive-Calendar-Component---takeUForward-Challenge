"use client";
import WallCalendar from "@/components/WallCalendar";
import { useState, useEffect } from "react";

const THEME_COLORS: string[][] = [
  ["#1a91d0", "#d1e9f6"], // Blue -> Light Blue
  ["#10b981", "#cff5e9"], // Emerald -> Light Emerald
  ["#f59e0b", "#fef3c7"], // Amber -> Light Amber
  ["#ef4444", "#fee2e2"], // Red -> Light Red
  ["#8b5cf6", "#ede9fe"], // Violet -> Light Violet
  ["#ec4899", "#fce7f3"], // Pink -> Light Pink
  ["#333333", "#e5e7eb"], // Dark Graphite -> Light Gray
];

export default function Home() {
  // Initialize state with the first color pair as default
  const [themeColor, setThemeColor] = useState<string[]>(THEME_COLORS[0]);

  // 1. Load from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("calendar-theme");
    if (savedColor) {
      try {
        setThemeColor(JSON.parse(savedColor));
      } catch (e) {
        console.error("Failed to parse theme from localStorage", e);
      }
    }
  }, []);

  // 2. Helper function to update state AND localStorage
  const handleThemeChange = (colorArray: string[]) => {
    setThemeColor(colorArray);
    localStorage.setItem("calendar-theme", JSON.stringify(colorArray));
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 sm:p-8 transition-colors duration-500"
      style={{ backgroundColor: themeColor[1] }}
    >
      <div className="w-full max-w-4xl flex flex-col items-center justify-center transition-transform duration-300">
        {/* --- WALL COLOR PICKER UI --- */}
        <div className="w-full flex justify-center gap-3 mb-8">
          {THEME_COLORS.map((colorArray) => {
            const firstColor = colorArray[0];
            const isActive = themeColor[0] === firstColor;

            return (
              <button
                key={firstColor}
                onClick={() => handleThemeChange(colorArray)}
                className={`w-6 h-6 rounded-full shadow-md transition-all duration-300 ${
                  isActive
                    ? "scale-125 ring-2 ring-offset-2 ring-gray-400"
                    : "hover:scale-110 opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: firstColor }}
                aria-label={`Set theme color to ${firstColor}`}
              />
            );
          })}
        </div>

        <WallCalendar themeColor={themeColor[0]} />
      </div>
    </main>
  );
}
