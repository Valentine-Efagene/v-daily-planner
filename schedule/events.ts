import type { Category, DayIndex, WeeklyBlock } from "./types";

function hm(h: number, m: number): number {
  return h * 60 + m;
}

function block(
  id: string,
  title: string,
  day: DayIndex,
  startH: number,
  startM: number,
  endH: number,
  endM: number,
  category: Category,
  opts?: { crossesMidnight?: boolean; overlapsParentId?: string }
): WeeklyBlock {
  const crossesMidnight =
    opts?.crossesMidnight ?? (endH === 0 && endM === 0 && startH > 0);
  return {
    id,
    title,
    day,
    startMinutes: hm(startH, startM),
    endMinutes: crossesMidnight ? 24 * 60 : hm(endH, endM),
    crossesMidnight,
    category,
    overlapsParentId: opts?.overlapsParentId,
  };
}

export const WEEKLY_BLOCKS: WeeklyBlock[] = [
  // Monday
  block("mon-sleep", "Sleep", 0, 0, 0, 7, 0, "sleep"),
  block("mon-dsa", "DSA", 0, 7, 0, 8, 0, "dsa"),
  block("mon-breakfast", "Breakfast / Get Ready", 0, 8, 0, 9, 0, "meal"),
  block("mon-work", "Work — Remote", 0, 9, 0, 18, 0, "work"),
  block("mon-java", "Java + Spring Boot", 0, 18, 0, 20, 0, "java"),
  block("mon-personal", "Personal Time", 0, 20, 0, 23, 0, "personal"),
  block("mon-wind", "Wind Down", 0, 23, 0, 0, 0, "wind_down", {
    crossesMidnight: true,
  }),
  // Tuesday
  block("tue-sleep", "Sleep", 1, 0, 0, 6, 0, "sleep"),
  block("tue-ready", "Get Ready", 1, 6, 0, 6, 30, "personal"),
  block("tue-commute-am", "Commute — To Office", 1, 6, 30, 9, 30, "commute"),
  block("tue-k8s-am", "Kubernetes Reading — Bus", 1, 8, 0, 8, 30, "k8s", {
    overlapsParentId: "tue-commute-am",
  }),
  block("tue-dsa", "DSA", 1, 10, 0, 11, 0, "dsa"),
  block("tue-miva", "MIVA Study", 1, 11, 0, 13, 0, "miva_study"),
  block("tue-lunch", "Lunch", 1, 13, 0, 14, 0, "meal"),
  block("tue-java", "Java + Spring Boot", 1, 14, 0, 15, 0, "java"),
  block("tue-work", "Work — Office", 1, 15, 0, 17, 30, "work"),
  block("tue-commute-pm", "Commute — Home", 1, 17, 30, 19, 0, "commute"),
  block("tue-k8s-pm", "Kubernetes Reading — Bus", 1, 18, 0, 18, 30, "k8s", {
    overlapsParentId: "tue-commute-pm",
  }),
  block("tue-personal", "Personal Time", 1, 19, 0, 22, 0, "personal"),
  block("tue-wind", "Wind Down / Sleep preparation", 1, 22, 0, 0, 0, "wind_down", {
    crossesMidnight: true,
  }),
  // Wednesday
  block("wed-sleep", "Sleep", 2, 0, 0, 7, 0, "sleep"),
  block("wed-dsa", "DSA", 2, 7, 0, 8, 0, "dsa"),
  block("wed-breakfast", "Breakfast / Get Ready", 2, 8, 0, 9, 0, "meal"),
  block("wed-work", "Work — Remote", 2, 9, 0, 18, 0, "work"),
  block("wed-miva", "MIVA Study", 2, 18, 0, 20, 0, "miva_study"),
  block("wed-personal", "Personal Time", 2, 20, 0, 23, 0, "personal"),
  block("wed-wind", "Wind Down", 2, 23, 0, 0, 0, "wind_down", {
    crossesMidnight: true,
  }),
  // Thursday
  block("thu-sleep", "Sleep", 3, 0, 0, 7, 0, "sleep"),
  block("thu-dsa", "DSA", 3, 7, 0, 8, 0, "dsa"),
  block("thu-breakfast", "Breakfast / Get Ready", 3, 8, 0, 9, 0, "meal"),
  block("thu-work", "Work — Remote", 3, 9, 0, 18, 0, "work"),
  block("thu-k8s", "Kubernetes — Hands-on", 3, 18, 0, 20, 0, "k8s"),
  block("thu-personal", "Personal Time", 3, 20, 0, 23, 0, "personal"),
  block("thu-wind", "Wind Down", 3, 23, 0, 0, 0, "wind_down", {
    crossesMidnight: true,
  }),
  // Friday
  block("fri-sleep", "Sleep", 4, 0, 0, 7, 0, "sleep"),
  block("fri-ready", "Get Ready", 4, 7, 0, 7, 30, "personal"),
  block("fri-commute-am", "Commute — To Office", 4, 6, 30, 9, 30, "commute"),
  block("fri-k8s-am", "Kubernetes Reading — Bus", 4, 8, 0, 8, 30, "k8s", {
    overlapsParentId: "fri-commute-am",
  }),
  block("fri-dsa", "DSA", 4, 10, 0, 11, 0, "dsa"),
  block("fri-miva", "MIVA Study", 4, 11, 0, 13, 0, "miva_study"),
  block("fri-lunch", "Lunch", 4, 13, 0, 14, 0, "meal"),
  block("fri-java", "Java + Spring Boot", 4, 14, 0, 15, 0, "java"),
  block("fri-work", "Work — Office", 4, 15, 0, 17, 30, "work"),
  block("fri-commute-pm", "Commute — Home", 4, 17, 30, 19, 0, "commute"),
  block("fri-k8s-pm", "Kubernetes Reading — Bus", 4, 18, 0, 18, 30, "k8s", {
    overlapsParentId: "fri-commute-pm",
  }),
  block("fri-personal", "Personal Time", 4, 19, 0, 22, 0, "personal"),
  block("fri-wind", "Wind Down", 4, 22, 0, 0, 0, "wind_down", {
    crossesMidnight: true,
  }),
  // Saturday
  block("sat-sleep", "Sleep", 5, 0, 0, 7, 0, "sleep"),
  block("sat-gym", "Gym", 5, 7, 0, 9, 0, "gym"),
  block("sat-breakfast", "Breakfast / Shower / Prepare", 5, 9, 0, 11, 0, "meal"),
  block("sat-miva-class", "MIVA Classes", 5, 11, 0, 13, 30, "miva_classes"),
  block("sat-miva", "MIVA Study", 5, 13, 30, 15, 0, "miva_study"),
  block("sat-social", "Friends / Social Time", 5, 15, 0, 19, 0, "social"),
  block("sat-commute", "Commute home from friends", 5, 19, 0, 20, 0, "commute"),
  block("sat-personal", "Personal / Relax", 5, 20, 0, 23, 0, "personal"),
  block("sat-wind", "Wind Down", 5, 23, 0, 0, 0, "wind_down", {
    crossesMidnight: true,
  }),
  // Sunday
  block("sun-sleep", "Sleep", 6, 0, 0, 7, 0, "sleep"),
  block("sun-miva-am", "MIVA Study", 6, 7, 0, 10, 0, "miva_study"),
  block("sun-dsa", "DSA", 6, 10, 0, 11, 0, "dsa"),
  block("sun-breakfast", "Breakfast / Break", 6, 11, 0, 12, 0, "meal"),
  block("sun-miva-mid", "MIVA Study", 6, 12, 0, 14, 0, "miva_study"),
  block("sun-girlfriend", "Girlfriend / Personal Time", 6, 14, 0, 17, 0, "personal"),
  block("sun-miva-pm", "MIVA Study", 6, 17, 0, 19, 0, "miva_study"),
  block("sun-planning", "Weekly Planning", 6, 19, 0, 20, 0, "planning"),
  block("sun-personal", "Personal / Relax", 6, 20, 0, 23, 0, "personal"),
  block("sun-wind", "Wind Down", 6, 23, 0, 0, 0, "wind_down", {
    crossesMidnight: true,
  }),
];

/** ICS tuple: title, day, startH, startM, endH, endM, crossesMidnight */
export function blockToIcsTuple(b: WeeklyBlock): [string, number, number, number, number, number, boolean?] {
  const startH = Math.floor(b.startMinutes / 60);
  const startM = b.startMinutes % 60;
  if (b.crossesMidnight) {
    return [b.title, b.day, startH, startM, 0, 0, true];
  }
  const endH = Math.floor(b.endMinutes / 60);
  const endM = b.endMinutes % 60;
  return [b.title, b.day, startH, startM, endH, endM];
}

export const ICS_EVENT_TUPLES = WEEKLY_BLOCKS.map(blockToIcsTuple);
