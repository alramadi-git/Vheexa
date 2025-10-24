import z from "zod/v4";

const zUUID = z.uuid();
type tUUID = z.infer<typeof zUUID>;

export type { tUUID };
export { zUUID };
