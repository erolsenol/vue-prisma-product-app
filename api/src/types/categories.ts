import { Static, Type } from "@sinclair/typebox";

export const Category = Type.Object({
  name: Type.String(),
  picture: Type.String(),
  parent_id: Type.Number(),
});

export type CategoryType = Static<typeof Category>;
