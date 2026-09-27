/** Monday = 0 … Sunday = 6 */
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Category =
  | "sleep"
  | "wind_down"
  | "work"
  | "commute"
  | "dsa"
  | "java"
  | "k8s"
  | "miva_study"
  | "miva_classes"
  | "meal"
  | "personal"
  | "gym"
  | "social"
  | "planning";

export type WeeklyBlock = {
  id: string;
  title: string;
  day: DayIndex;
  startMinutes: number;
  endMinutes: number;
  crossesMidnight: boolean;
  category: Category;
  /** Nested under parent in UI (e.g. bus reading during commute) */
  overlapsParentId?: string;
};

/** Future: local completion tracking */
export type DayCompletion = {
  date: string;
  completedIds: string[];
  notes?: Record<string, string>;
};

export const TIMEZONE = "Africa/Lagos" as const;

export const WEEK_ANCHOR = { y: 2026, m: 9, d: 28 } as const;

export const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const OFFICE_DAYS: DayIndex[] = [1, 4];
export const REMOTE_DAYS: DayIndex[] = [0, 2, 3];

export type TimelineEntry = {
  block: WeeklyBlock;
  nested: WeeklyBlock[];
};

export type NowState = {
  current: WeeklyBlock | null;
  nestedCurrent: WeeklyBlock[];
  progressPercent: number;
  next: WeeklyBlock | null;
};
