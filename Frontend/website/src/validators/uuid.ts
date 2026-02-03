import z from "zod";

const zUuid = z.uuid();
type tUuid = z.infer<typeof zUuid>;

export type { tUuid };
export { zUuid };
