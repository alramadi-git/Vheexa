import z from "zod";

const zBirthday = z.date().refine((value) => {
  const date = new Date();
  return value.getTime() <= date.setFullYear(date.getFullYear() - 18);
}, "You must be at least 18 years old.");
type tBirthday = z.infer<typeof zBirthday>;

export type { tBirthday };
export { zBirthday };
