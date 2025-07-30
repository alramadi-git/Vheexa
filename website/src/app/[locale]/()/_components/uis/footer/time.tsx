"use client";

export default function Time() {
  const year = new Date().getFullYear();

  return <time dateTime={`${year}`}>{year}</time>;
}
