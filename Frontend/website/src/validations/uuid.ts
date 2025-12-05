import z from "zod/v4";

const zUuid = z.uuid();
type tUuid = z.infer<typeof zUuid>;

export { zUuid };
export type { tUuid };
