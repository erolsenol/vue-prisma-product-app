export const ProductSchema = `{
  title: "Product Schema",
  type: "object",
  properties: {
    name: { type: "string" },
    picture: { type: "string" },
    category_id: { type: "number" },
  },
  additionalProperties: false,
  required: ["name", "picture", "category_id"],
}`;

import S from "fluent-json-schema";

export const ProductCreateSchema = {
  body: {
    name: S.string().required(),
    picture: S.string().required(),
    category_id: S.number().required(),
  },
} as const;
