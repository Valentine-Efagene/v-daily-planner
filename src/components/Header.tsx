import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
            Daily planner
          </p>
          <p className="text-sm text-stone-700">Africa/Lagos · rigid weekly blocks</p>
        </div>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 font-medium text-stone-800 hover:bg-stone-100"
          >
            Today
          </Link>
          <Link
            href="/week"
            className="rounded-md px-3 py-1.5 font-medium text-stone-800 hover:bg-stone-100"
          >
            Week
          </Link>
          <a
            href="/Valentine_Weekly_Schedule.ics"
            download
            className="rounded-md border border-stone-300 px-3 py-1.5 font-medium text-stone-800 hover:bg-stone-50"
          >
            Download .ics
          </a>
        </nav>
      </div>
    </header>
  );
}
