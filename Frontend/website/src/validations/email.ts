import z from "zod";

const zEmail = z.email();
type tEmail = z.infer<typeof zEmail>;

export type { tEmail };
export { zEmail };
