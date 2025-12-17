import z from "zod";

import { isValidPhoneNumber } from "react-phone-number-input";

const zPhoneNumber = z
  .string()
  .refine((value) => isValidPhoneNumber(value), "Invalid phone number.");
type tPhoneNumber = z.infer<typeof zPhoneNumber>;

export type { tPhoneNumber };
export { zPhoneNumber };
