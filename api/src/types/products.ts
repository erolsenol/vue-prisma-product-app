import { Static, Type } from "@sinclair/typebox";

export const Product = Type.Object({
  name: Type.String(),
  picture: Type.String(),
  category_id: Type.Number(),
});

export type ProductType = Static<typeof Product>;
