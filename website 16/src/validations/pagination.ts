import { z } from "zod";

enum PAGE_SIZE {
  _5 = 5,
  _10 = 10,
  _20 = 20,
  _50 = 50,
}

type TPagination = {
  Page: number;
  PageSize: number;
};
const zPagination = z
  .object({
    Page: z.number().min(1).default(1),
    PageSize: z.enum(PAGE_SIZE).default(PAGE_SIZE._10),
  })
  .strict();

export type { TPagination };
export { PAGE_SIZE, zPagination };
