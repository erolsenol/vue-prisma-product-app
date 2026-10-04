import type { Static } from "@sinclair/typebox";
import { CategoryCreateSchema, CategoryParamsIdSchema, CategoryUpdateSchema } from "../schemas/categories";

export type CategoryCreateType = Static<typeof CategoryCreateSchema>;
export type CategoryUpdateType = Static<typeof CategoryUpdateSchema>;
export type CategoryParamsIdType = Static<typeof CategoryParamsIdSchema>;
