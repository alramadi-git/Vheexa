import z from "zod";

const zBirthdayMax = z
  .date()
  .refine((value) => value <= new Date(), "birthday cannot be in the future.");
type tBirthdayMax = z.infer<typeof zBirthdayMax>;

const zBirthdayMin = z.date().refine((value) => {
  const date = new Date();
  return value.getTime() <= date.setFullYear(date.getFullYear() - 18);
}, "birthday must be at least 18 years old.");
type tBirthdayMin = z.infer<typeof zBirthdayMin>;

const zBirthday = zBirthdayMin.pipe(zBirthdayMax);
type tBirthday = z.infer<typeof zBirthday>;

export type { tBirthdayMin, tBirthdayMax, tBirthday };
export { zBirthdayMin, zBirthdayMax, zBirthday };
