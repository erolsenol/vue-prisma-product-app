import S from "fluent-json-schema";

export const CategoriesCreateSchema = {
  body: S.object()
    .additionalProperties(false)
    .prop("name", S.string().minLength(1).required())
    .prop("picture", S.string())
    .prop("picture_name", S.string().pattern("^[A-Za-z0-9][A-Za-z0-9._-]*$"))
    .prop("parent_id", S.integer().minimum(1).raw({ nullable: true })),
} as const;

export const CategoriesUpdateSchema = {
  params: S.object().prop("id", S.number().required()),
  body: S.object()
    .minProperties(1)
    .additionalProperties(false)
    .prop("name", S.string().minLength(1))
    .prop("picture", S.string())
    .prop("picture_name", S.string().pattern("^[A-Za-z0-9][A-Za-z0-9._-]*$"))
    .prop("parent_id", S.integer().minimum(1).raw({ nullable: true })),
} as const;

export const CategoriesGetSchema = {
  params: S.object().prop("id", S.number().required()),
} as const;
