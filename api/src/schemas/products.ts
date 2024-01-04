import S from "fluent-json-schema";

export const ProductCreateSchema = {
  body: S.object()
    .additionalProperties(false)
    .prop("name", S.string().required())
    .prop("picture", S.string().required())
    .prop("category_id", S.number().required()),
} as const;
