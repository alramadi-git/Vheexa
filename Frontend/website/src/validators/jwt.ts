import z from "zod";

const zJwt = z.jwt();
type tJwt = z.infer<typeof zJwt>;

export type { tJwt };
export { zJwt };
