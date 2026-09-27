import { CategoryLegend } from "@/components/CategoryLegend";
import { Header } from "@/components/Header";
import { StudySummary } from "@/components/StudySummary";
import { WeekGrid } from "@/components/WeekGrid";

export default function WeekPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Week view</h1>
          <p className="mt-1 text-sm text-stone-600">
            Seven-day grid, 00:00–24:00 WAT. Overlapping bus reading is in the calendar only.
          </p>
        </div>
        <WeekGrid />
        <CategoryLegend />
        <StudySummary />
      </main>
    </>
  );
}
