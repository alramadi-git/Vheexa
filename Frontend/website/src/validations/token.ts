import z from "zod";

const zToken = z.jwt();
type tToken = z.infer<typeof zToken>;

export type { tToken };
export { zToken };
