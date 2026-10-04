import type { Static } from "@sinclair/typebox";
import { PaginationSchema } from "../schemas/pagination";

export type PaginationType = Static<typeof PaginationSchema>;
