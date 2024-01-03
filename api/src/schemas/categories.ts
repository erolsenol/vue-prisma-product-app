import S from "fluent-json-schema";

export const CategoriesCreateSchema = {
  title:"Product Create",
  body: {
    name: S.string().required(),
    picture: S.string().required(),
    parent_id: S.number(),
  },
} as const;
