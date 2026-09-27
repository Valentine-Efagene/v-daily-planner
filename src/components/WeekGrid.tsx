import { categoryClass } from "@/lib/categories";
import {
  DAY_NAMES,
  formatMinutes,
  getBlocksForDay,
  getLocationLabel,
  type DayIndex,
} from "@schedule/index";
import type { WeeklyBlock } from "@schedule/types";

const MINUTES_PER_DAY = 24 * 60;

function blockWidthStyle(block: WeeklyBlock) {
  const start = (block.startMinutes / MINUTES_PER_DAY) * 100;
  const end = (block.endMinutes / MINUTES_PER_DAY) * 100;
  return { left: `${start}%`, width: `${end - start}%` };
}

function DayRow({ day }: { day: DayIndex }) {
  const blocks = getBlocksForDay(day).filter((b) => !b.overlapsParentId);
  const location = getLocationLabel(day);

  return (
    <div className="flex min-w-[720px] items-stretch gap-2 border-b border-stone-100 py-1.5 last:border-0">
      <div className="w-28 shrink-0 py-1 pr-2">
        <p className="text-sm font-semibold text-stone-900">{DAY_NAMES[day].slice(0, 3)}</p>
        {location && (
          <p className="text-[10px] uppercase tracking-wide text-stone-500">{location}</p>
        )}
      </div>
      <div className="relative h-9 flex-1 rounded border border-stone-200 bg-stone-50">
        {blocks.map((block) => {
          const style = blockWidthStyle(block);
          return (
            <div
              key={block.id}
              title={`${block.title} (${formatMinutes(block.startMinutes)}–${block.crossesMidnight ? "24:00" : formatMinutes(block.endMinutes)})`}
              className={`absolute top-0.5 bottom-0.5 overflow-hidden rounded-sm px-0.5 text-[9px] font-medium leading-tight ${categoryClass(block.category)}`}
              style={style}
            >
              <span className="block truncate">{block.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WeekGrid() {
  const hours = [0, 3, 6, 9, 12, 15, 18, 21, 24];

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 flex min-w-[720px] gap-2 pl-28">
        <div className="relative flex-1">
          <div className="flex justify-between text-[10px] font-mono text-stone-500">
            {hours.map((h) => (
              <span key={h}>{String(h).padStart(2, "0")}:00</span>
            ))}
          </div>
        </div>
      </div>
      {([0, 1, 2, 3, 4, 5, 6] as DayIndex[]).map((day) => (
        <DayRow key={day} day={day} />
      ))}
    </div>
  );
}
