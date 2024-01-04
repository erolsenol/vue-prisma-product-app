import S from "fluent-json-schema";

export const ProductCreateSchema = {
  body: S.object()
    .additionalProperties(false)
    .prop("name", S.string().required())
    .prop("picture", S.string().required())
    .prop("category_id", S.number().required()),
} as const;

export const ProductUpdateSchema = {
  params: S.object().prop("id", S.number().required()),
  body: S.object()
    .minProperties(1)
    .additionalProperties(false)
    .prop("name", S.string())
    .prop("picture", S.string())
    .prop("category_id", S.number()),
} as const;
