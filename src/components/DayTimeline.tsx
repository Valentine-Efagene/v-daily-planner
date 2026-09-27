import { categoryClass } from "@/lib/categories";
import {
  formatBlockRange,
  type TimelineEntry,
} from "@schedule/index";
import type { WeeklyBlock } from "@schedule/types";

type Props = {
  entries: TimelineEntry[];
  currentId: string | null;
};

function BlockRow({
  block,
  nested,
  isCurrent,
}: {
  block: WeeklyBlock;
  nested: WeeklyBlock[];
  isCurrent: boolean;
}) {
  return (
    <li
      className={`rounded-lg border px-3 py-2 ${
        isCurrent
          ? "border-stone-900 bg-stone-50 shadow-sm"
          : "border-stone-200 bg-white"
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-medium text-stone-900">{block.title}</span>
        <span className="font-mono text-xs text-stone-600">
          {formatBlockRange(block)}
        </span>
      </div>
      <span
        className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${categoryClass(block.category)}`}
      >
        {block.category.replace("_", " ")}
      </span>
      {nested.length > 0 && (
        <ul className="mt-2 space-y-1 border-l-2 border-dashed border-stone-300 pl-3">
          {nested.map((n) => (
            <li key={n.id} className="text-sm text-stone-700">
              <span className="font-mono text-xs text-stone-500">
                {formatBlockRange(n)}
              </span>{" "}
              {n.title}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function DayTimeline({ entries, currentId }: Props) {
  return (
    <ol className="space-y-2">
      {entries.map(({ block, nested }) => (
        <BlockRow
          key={block.id}
          block={block}
          nested={nested}
          isCurrent={block.id === currentId}
        />
      ))}
    </ol>
  );
}
