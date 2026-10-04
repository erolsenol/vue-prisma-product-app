import { Value } from "@sinclair/typebox/value";
import { describe, expect, it } from "vitest";

import { CategoryCreateSchema, CategoryParamsIdSchema, CategoryUpdateSchema } from "../src/schemas/categories";
import { PaginationSchema } from "../src/schemas/pagination";
import { ProductCreateSchema, ProductParamsIdSchema, ProductUpdateSchema } from "../src/schemas/products";

describe("API request schemas", () => {
  it("allows product create requests without an image", () => {
    expect(Value.Check(ProductCreateSchema, { name: "Keyboard", category_id: 3 })).toBe(true);
    expect(Value.Check(ProductCreateSchema, { name: "Keyboard", category_id: 3, extra: true })).toBe(false);
  });

  it("allows partial product updates and rejects empty updates", () => {
    expect(Value.Check(ProductUpdateSchema, { name: "Keyboard Pro" })).toBe(true);
    expect(Value.Check(ProductUpdateSchema, {})).toBe(false);
  });

  it("allows optional and nullable category parents", () => {
    expect(Value.Check(CategoryCreateSchema, { name: "Accessories" })).toBe(true);
    expect(Value.Check(CategoryCreateSchema, { name: "Root", parent_id: null })).toBe(true);
    expect(Value.Check(CategoryUpdateSchema, { parent_id: null })).toBe(true);
    expect(Value.Check(CategoryUpdateSchema, {})).toBe(false);
  });

  it("requires positive integer resource IDs", () => {
    expect(Value.Check(ProductParamsIdSchema, { id: 1 })).toBe(true);
    expect(Value.Check(ProductParamsIdSchema, { id: 0 })).toBe(false);
    expect(Value.Check(CategoryParamsIdSchema, { id: 1.5 })).toBe(false);
  });

  it("constrains pagination and its all flag", () => {
    expect(Value.Check(PaginationSchema, {})).toBe(true);
    expect(Value.Check(PaginationSchema, { page: 1, limit: 100, all: 1 })).toBe(true);
    expect(Value.Check(PaginationSchema, { page: 0 })).toBe(false);
    expect(Value.Check(PaginationSchema, { limit: 101 })).toBe(false);
    expect(Value.Check(PaginationSchema, { all: 2 })).toBe(false);
  });
});
