#!/usr/bin/env node
/**
 * Builds Valentine_Weekly_Schedule.ics from shared schedule data.
 * Week anchor: Monday 2026-09-28 (Africa/Lagos).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ICS_EVENT_TUPLES } from "../schedule/events";
import { WEEK_ANCHOR } from "../schedule/types";

const WEEK_START = WEEK_ANCHOR;
const TZ = "Africa/Lagos";
const EVENTS = ICS_EVENT_TUPLES;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function addDays(y: number, m: number, d: number, offset: number) {
  const dt = new Date(Date.UTC(y, m - 1, d + offset));
  return {
    y: dt.getUTCFullYear(),
    m: dt.getUTCMonth() + 1,
    d: dt.getUTCDate(),
  };
}

function toIcsLocal(
  { y, m, d }: { y: number; m: number; d: number },
  hour: number,
  minute: number
) {
  return `${y}${pad(m)}${pad(d)}T${pad(hour)}${pad(minute)}00`;
}

function endParts(
  dayOffset: number,
  endH: number,
  endM: number,
  crossesMidnight: boolean
) {
  if (crossesMidnight || (endH === 0 && endM === 0)) {
    const next = addDays(WEEK_START.y, WEEK_START.m, WEEK_START.d, dayOffset + 1);
    return { date: next, h: 0, m: 0 };
  }
  const date = addDays(WEEK_START.y, WEEK_START.m, WEEK_START.d, dayOffset);
  return { date, h: endH, m: endM };
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function foldLine(line: string) {
  const max = 73;
  if (line.length <= max) return line;
  let out = line.slice(0, max) + "\r\n ";
  let rest = line.slice(max);
  while (rest.length > max) {
    out += rest.slice(0, max) + "\r\n ";
    rest = rest.slice(max);
  }
  return out + rest;
}

const now = new Date();
const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(
  now.getUTCDate()
)}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

const lines = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Valentine//Weekly Schedule//EN",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "NAME:Valentine Weekly Schedule",
  "X-WR-CALNAME:Valentine Weekly Schedule",
  "X-WR-TIMEZONE:Africa/Lagos",
  "BEGIN:VTIMEZONE",
  "TZID:Africa/Lagos",
  "X-LIC-LOCATION:Africa/Lagos",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0100",
  "TZNAME:WAT",
  "DTSTART:19700101T000000",
  "END:STANDARD",
  "END:VTIMEZONE",
];

const seen = new Map<string, number>();
for (const [summary, dayOffset, sh, sm, eh, em, crossesMidnight] of EVENTS) {
  const startDate = addDays(WEEK_START.y, WEEK_START.m, WEEK_START.d, dayOffset);
  const end = endParts(dayOffset, eh, em, !!crossesMidnight);
  const dtstart = toIcsLocal(startDate, sh, sm);
  const dtend = toIcsLocal(end.date, end.h, end.m);
  const key = `${summary}|${dayOffset}|${dtstart}`;
  const n = (seen.get(key) ?? 0) + 1;
  seen.set(key, n);
  const uid = `valentine-${slug(summary)}-${dayOffset}-${n}@weekly.local`;

  lines.push("BEGIN:VEVENT");
  lines.push(`UID:${uid}`);
  lines.push(`DTSTAMP:${dtstamp}`);
  lines.push(`DTSTART;TZID=${TZ}:${dtstart}`);
  lines.push(`DTEND;TZID=${TZ}:${dtend}`);
  lines.push("RRULE:FREQ=WEEKLY");
  lines.push(
    foldLine(
      `SUMMARY:${summary.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,")}`
    )
  );
  lines.push("END:VEVENT");
}

lines.push("END:VCALENDAR");

const out = lines.join("\r\n") + "\r\n";
const dir = path.dirname(fileURLToPath(import.meta.url));
const dest = path.join(dir, "..", "public", "Valentine_Weekly_Schedule.ics");
fs.writeFileSync(dest, out);
console.log("Wrote", dest, EVENTS.length, "events");
