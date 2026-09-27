import { WEEKLY_BLOCKS } from "./events";
import type { DayIndex, NowState, TimelineEntry, WeeklyBlock } from "./types";
import { DAY_NAMES, OFFICE_DAYS, REMOTE_DAYS, TIMEZONE } from "./types";

export * from "./types";
export { WEEKLY_BLOCKS } from "./events";

export function getBlocksForDay(day: DayIndex): WeeklyBlock[] {
  return WEEKLY_BLOCKS.filter((b) => b.day === day).sort(
    (a, b) => a.startMinutes - b.startMinutes
  );
}

export function dayIndexFromDate(date: Date, tz = TIMEZONE): DayIndex {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
  }).format(date);
  const map: Record<string, DayIndex> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  return map[weekday] ?? 0;
}

export function minutesNowInTz(date: Date, tz = TIMEZONE): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

export function isBlockActive(block: WeeklyBlock, nowMinutes: number): boolean {
  if (block.crossesMidnight) {
    return nowMinutes >= block.startMinutes;
  }
  return nowMinutes >= block.startMinutes && nowMinutes < block.endMinutes;
}

export function blockDurationMinutes(block: WeeklyBlock): number {
  if (block.crossesMidnight) {
    return 24 * 60 - block.startMinutes;
  }
  return block.endMinutes - block.startMinutes;
}

export function formatMinutes(m: number): string {
  const h = Math.floor(m / 60) % 24;
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function formatBlockRange(block: WeeklyBlock): string {
  return `${formatMinutes(block.startMinutes)}–${block.crossesMidnight ? "24:00" : formatMinutes(block.endMinutes)}`;
}

export function getTimelineForDay(day: DayIndex): TimelineEntry[] {
  const blocks = getBlocksForDay(day);
  const nestedIds = new Set(
    blocks.filter((b) => b.overlapsParentId).map((b) => b.id)
  );
  const primary = blocks.filter((b) => !nestedIds.has(b.id));

  return primary.map((block) => ({
    block,
    nested: blocks.filter((b) => b.overlapsParentId === block.id),
  }));
}

export function getNowState(date: Date, tz = TIMEZONE): NowState {
  const day = dayIndexFromDate(date, tz);
  const nowMinutes = minutesNowInTz(date, tz);
  const blocks = getBlocksForDay(day);

  let current: WeeklyBlock | null = null;
  let nestedCurrent: WeeklyBlock[] = [];
  let progressPercent = 0;

  const primaryBlocks = blocks.filter((b) => !b.overlapsParentId);

  for (const block of primaryBlocks) {
    if (isBlockActive(block, nowMinutes)) {
      current = block;
      nestedCurrent = blocks.filter(
        (b) => b.overlapsParentId === block.id && isBlockActive(b, nowMinutes)
      );
      const dur = blockDurationMinutes(block);
      const elapsed = nowMinutes - block.startMinutes;
      progressPercent = dur > 0 ? Math.min(100, (elapsed / dur) * 100) : 0;
      break;
    }
  }

  let next: WeeklyBlock | null = null;
  for (const block of primaryBlocks) {
    if (block.startMinutes > nowMinutes) {
      next = block;
      break;
    }
  }

  return { current, nestedCurrent, progressPercent, next };
}

export function getDayLabel(day: DayIndex): string {
  return DAY_NAMES[day];
}

export function getLocationLabel(day: DayIndex): string | null {
  if (OFFICE_DAYS.includes(day)) return "Office";
  if (REMOTE_DAYS.includes(day)) return "Remote";
  return null;
}

export const STUDY_SUMMARY = {
  dsa: 7,
  java: 4,
  k8s: 4,
  mivaStudy: 16.5,
  mivaClasses: 2.5,
} as const;
