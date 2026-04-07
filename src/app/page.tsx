import WallCalendar from "@/components/WallCalendar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <WallCalendar />
      </div>
    </main>
  );
}
