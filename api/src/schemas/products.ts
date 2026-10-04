import { Type } from "@sinclair/typebox";

const pictureProperties = {
  picture: Type.Optional(Type.String()),
  picture_name: Type.Optional(Type.String({ pattern: "^[A-Za-z0-9][A-Za-z0-9._-]*$" })),
};

export const ProductCreateSchema = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    ...pictureProperties,
    category_id: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

export const ProductUpdateSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 1 })),
    ...pictureProperties,
    category_id: Type.Optional(Type.Integer({ minimum: 1 })),
  },
  { additionalProperties: false, minProperties: 1 },
);

export const ProductParamsIdSchema = Type.Object(
  { id: Type.Integer({ minimum: 1 }) },
  { additionalProperties: false },
);
