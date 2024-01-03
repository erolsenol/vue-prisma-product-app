export const ProductCreateSchema = {
  title: "Product Create Schema",
  type: "object",
  properties: {
    name: { type: "string" },
    picture: { type: "string" },
    category_id: { type: "number" },
  },
  additionalProperties: false,
  required: ["name", "picture", "category_id"],
};
