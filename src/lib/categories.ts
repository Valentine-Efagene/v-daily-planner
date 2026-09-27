import type { Category } from "@schedule/types";

export const CATEGORY_STYLES: Record<
  Category,
  { bg: string; text: string; label: string }
> = {
  sleep: { bg: "bg-indigo-950", text: "text-indigo-100", label: "Sleep" },
  wind_down: { bg: "bg-indigo-200", text: "text-indigo-950", label: "Wind down" },
  work: { bg: "bg-slate-600", text: "text-slate-50", label: "Work" },
  commute: { bg: "bg-orange-600", text: "text-orange-50", label: "Commute" },
  dsa: { bg: "bg-violet-600", text: "text-violet-50", label: "DSA" },
  java: { bg: "bg-sky-700", text: "text-sky-50", label: "Java / Spring" },
  k8s: { bg: "bg-teal-700", text: "text-teal-50", label: "Kubernetes" },
  miva_study: { bg: "bg-green-700", text: "text-green-50", label: "MIVA study" },
  miva_classes: { bg: "bg-green-800", text: "text-green-50", label: "MIVA classes" },
  meal: { bg: "bg-stone-200", text: "text-stone-800", label: "Meals / prep" },
  personal: { bg: "bg-stone-100", text: "text-stone-800", label: "Personal" },
  gym: { bg: "bg-pink-600", text: "text-pink-50", label: "Gym" },
  social: { bg: "bg-amber-500", text: "text-amber-950", label: "Social" },
  planning: { bg: "bg-slate-400", text: "text-slate-900", label: "Planning" },
};

export function categoryClass(category: Category): string {
  const s = CATEGORY_STYLES[category];
  return `${s.bg} ${s.text}`;
}
