import { Static, Type } from "@sinclair/typebox";

export const Product = Type.Object({
  name: Type.String(),
  picture: Type.String(),
  picture_name: Type.String(),
  category_id: Type.Number(),
});

export const ProductParamsId = Type.Object({
  id: Type.Number(),
});

export type ProductType = Static<typeof Product>;
export type ProductParamsIdType = Static<typeof ProductParamsId>;
