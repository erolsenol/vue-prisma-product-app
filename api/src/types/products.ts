import type { Static } from "@sinclair/typebox";
import { ProductCreateSchema, ProductParamsIdSchema, ProductUpdateSchema } from "../schemas/products";

export type ProductCreateType = Static<typeof ProductCreateSchema>;
export type ProductUpdateType = Static<typeof ProductUpdateSchema>;
export type ProductParamsIdType = Static<typeof ProductParamsIdSchema>;
