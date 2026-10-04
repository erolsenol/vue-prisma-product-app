import { Type } from "@sinclair/typebox";

export const PaginationSchema = Type.Object(
  {
    page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
    all: Type.Optional(Type.Integer({ minimum: 0, maximum: 1, default: 0 })),
  },
  { additionalProperties: false },
);
