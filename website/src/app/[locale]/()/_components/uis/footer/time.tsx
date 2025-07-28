"use client";

export default function Time() {
  const date = new Date();
  return <time dateTime={date.toISOString()}>{date.getFullYear()}</time>;
}
