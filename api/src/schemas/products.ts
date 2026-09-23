import S from "fluent-json-schema";

export const ProductCreateSchema = {
  body: S.object()
    .additionalProperties(false)
    .prop("name", S.string().minLength(1).required())
    .prop("picture", S.string())
    .prop("picture_name", S.string().pattern("^[A-Za-z0-9][A-Za-z0-9._-]*$"))
    .prop("category_id", S.integer().minimum(1).required()),
} as const;

export const ProductUpdateSchema = {
  params: S.object().prop("id", S.number().required()),
  body: S.object()
    .minProperties(1)
    .additionalProperties(false)
    .prop("name", S.string().minLength(1))
    .prop("picture", S.string())
    .prop("picture_name", S.string().pattern("^[A-Za-z0-9][A-Za-z0-9._-]*$"))
    .prop("category_id", S.integer().minimum(1)),
} as const;

export const ProductGetSchema = {
  params: S.object().prop("id", S.number().required()),
} as const;
