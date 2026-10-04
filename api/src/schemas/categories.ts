import { Type } from "@sinclair/typebox";

const parentId = Type.Optional(
  Type.Union([Type.Integer({ minimum: 1 }), Type.Null()]),
);

const pictureProperties = {
  picture: Type.Optional(Type.String()),
  picture_name: Type.Optional(Type.String({ pattern: "^[A-Za-z0-9][A-Za-z0-9._-]*$" })),
};

export const CategoryCreateSchema = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    ...pictureProperties,
    parent_id: parentId,
  },
  { additionalProperties: false },
);

export const CategoryUpdateSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 1 })),
    ...pictureProperties,
    parent_id: Type.Optional(Type.Union([Type.Integer({ minimum: 1 }), Type.Null()])),
  },
  { additionalProperties: false, minProperties: 1 },
);

export const CategoryParamsIdSchema = Type.Object(
  { id: Type.Integer({ minimum: 1 }) },
  { additionalProperties: false },
);
