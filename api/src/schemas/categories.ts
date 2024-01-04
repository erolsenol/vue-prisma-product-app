import S from "fluent-json-schema";

export const CategoriesCreateSchema = {
  body: S.object()
    .additionalProperties(false)
    .prop("name", S.string().required())
    .prop("picture", S.string().required())
    .prop("parent_id", S.number().raw({ nullable: true })),
} as const;
