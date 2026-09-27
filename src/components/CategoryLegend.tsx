import { CATEGORY_STYLES } from "@/lib/categories";
import type { Category } from "@schedule/types";

const LEGEND_ORDER: Category[] = [
  "sleep",
  "wind_down",
  "work",
  "commute",
  "dsa",
  "java",
  "k8s",
  "miva_study",
  "miva_classes",
  "meal",
  "gym",
  "social",
  "planning",
  "personal",
];

export function CategoryLegend() {
  return (
    <div className="flex flex-wrap gap-2">
      {LEGEND_ORDER.map((cat) => {
        const s = CATEGORY_STYLES[cat];
        return (
          <span
            key={cat}
            className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}
          >
            {s.label}
          </span>
        );
      })}
    </div>
  );
}
