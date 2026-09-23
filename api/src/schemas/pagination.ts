import S from "fluent-json-schema";

export const PaginationSchema = S.object()
  .additionalProperties(false)
  .prop("page", S.integer().minimum(1).default(1))
  .prop("limit", S.integer().minimum(1).maximum(100).default(20))
  .prop("all", S.integer().minimum(0).maximum(1).default(0));
