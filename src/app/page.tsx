import { Header } from "@/components/Header";
import { TodayView } from "@/components/TodayView";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <TodayView />
      </main>
    </>
  );
}
