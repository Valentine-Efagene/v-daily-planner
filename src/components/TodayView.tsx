"use client";

import { useEffect, useState } from "react";
import { categoryClass } from "@/lib/categories";
import {
  dayIndexFromDate,
  formatBlockRange,
  getDayLabel,
  getLocationLabel,
  getNowState,
  getTimelineForDay,
  TIMEZONE,
} from "@schedule/index";
import { DayTimeline } from "./DayTimeline";
import { StudySummary } from "./StudySummary";

function formatLagosDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function TodayView() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const day = dayIndexFromDate(now);
  const { current, nestedCurrent, progressPercent, next } = getNowState(now);
  const timeline = getTimelineForDay(day);
  const location = getLocationLabel(day);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="font-mono text-sm text-stone-600">{formatLagosDateTime(now)} WAT</p>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
            {getDayLabel(day)}
          </h1>
          {location && (
            <span className="rounded-full bg-stone-900 px-2.5 py-0.5 text-xs font-medium text-white">
              {location}
            </span>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Now</p>
        {current ? (
          <>
            <h2 className="mt-1 text-xl font-semibold text-stone-900">{current.title}</h2>
            <p className="font-mono text-sm text-stone-600">{formatBlockRange(current)}</p>
            <span
              className={`mt-2 inline-block rounded px-2 py-0.5 text-xs font-medium ${categoryClass(current.category)}`}
            >
              {current.category.replace("_", " ")}
            </span>
            {nestedCurrent.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-stone-700">
                {nestedCurrent.map((n) => (
                  <li key={n.id}>Also: {n.title}</li>
                ))}
              </ul>
            )}
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full bg-stone-900 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-stone-500">
              {Math.round(progressPercent)}% through this block
            </p>
          </>
        ) : (
          <p className="mt-2 text-stone-700">No scheduled block right now.</p>
        )}
      </section>

      {next && (
        <section>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Up next</p>
          <p className="mt-1 font-medium text-stone-900">
            {next.title}{" "}
            <span className="font-mono text-sm font-normal text-stone-600">
              {formatBlockRange(next)}
            </span>
          </p>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
          Today&apos;s timeline
        </h2>
        <DayTimeline entries={timeline} currentId={current?.id ?? null} />
      </section>

      <StudySummary />
    </div>
  );
}
