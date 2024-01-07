import S from "fluent-json-schema";

export const CategoriesCreateSchema = {
  body: S.object()
    .additionalProperties(false)
    .prop("name", S.string().required())
    .prop("picture", S.string())
    .prop("picture_name", S.string())
    .prop("parent_id", S.number().raw({ nullable: true })),
} as const;

export const CategoriesUpdateSchema = {
  params: S.object().prop("id", S.number().required()),
  body: S.object()
    .minProperties(1)
    .additionalProperties(false)
    .prop("name", S.string())
    .prop("picture", S.string())
    .prop("picture_name", S.string())
    .prop("parent_id", S.number().raw({ nullable: true })),
} as const;

export const CategoriesGetSchema = {
  params: S.object().prop("id", S.number().required()),
} as const;
