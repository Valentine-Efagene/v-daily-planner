import assert from "node:assert/strict";
import test from "node:test";
import {
  dayIndexFromDate,
  getBlocksForDay,
  getNowState,
  minutesNowInTz,
  TIMEZONE,
} from "./index";

test("Tuesday 10:30 WAT is DSA block", () => {
  // 2026-09-29 is Tuesday; 10:30 WAT = 09:30 UTC
  const date = new Date("2026-09-29T09:30:00.000Z");
  assert.equal(dayIndexFromDate(date, TIMEZONE), 1);
  const { current } = getNowState(date, TIMEZONE);
  assert.equal(current?.id, "tue-dsa");
});

test("Tuesday has nested K8s under commute blocks", () => {
  const tue = getBlocksForDay(1);
  const am = tue.find((b) => b.id === "tue-k8s-am");
  assert.equal(am?.overlapsParentId, "tue-commute-am");
});

test("Friday evening has no study after 19:00", () => {
  const fri = getBlocksForDay(4).filter((b) => !b.overlapsParentId);
  const studyCats = new Set(["dsa", "java", "k8s", "miva_study", "miva_classes"]);
  const eveningStudy = fri.filter(
    (b) => studyCats.has(b.category) && b.startMinutes >= 19 * 60
  );
  assert.equal(eveningStudy.length, 0);
});

test("minutesNowInTz reads Lagos wall clock", () => {
  const date = new Date("2026-09-28T06:00:00.000Z"); // 07:00 WAT
  assert.equal(minutesNowInTz(date, TIMEZONE), 7 * 60);
});
