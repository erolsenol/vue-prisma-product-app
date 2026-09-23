import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { buildApp } from "../src/app";
import prisma from "../prisma";

const databaseTestsEnabled = process.env.RUN_DB_TESTS === "true";

describe.skipIf(!databaseTestsEnabled)("database-backed product flow", () => {
  const categoryName = `Integration category ${Date.now()}`;
  let app: Awaited<ReturnType<typeof buildApp>>;
  let categoryId: number | undefined;
  let productId: number | undefined;

  beforeAll(async () => {
    app = await buildApp({ logger: false });
    await prisma.$connect();
  });

  afterAll(async () => {
    if (productId) await prisma.product.deleteMany({ where: { id: productId } });
    if (categoryId) await prisma.category.deleteMany({ where: { id: categoryId } });
    await app.close();
  });

  it("creates, reads, updates and deletes a product through the API", async () => {
    const categoryResponse = await app.inject({
      method: "POST",
      url: "/api/categories",
      payload: { name: categoryName },
    });

    expect(categoryResponse.statusCode).toBe(200);
    categoryId = categoryResponse.json<{ data: { id: number } }>().data.id;

    const createResponse = await app.inject({
      method: "POST",
      url: "/api/products",
      payload: { name: "Integration keyboard", category_id: categoryId },
    });

    expect(createResponse.statusCode).toBe(200);
    productId = createResponse.json<{ data: { id: number } }>().data.id;

    const updateResponse = await app.inject({
      method: "PUT",
      url: `/api/products/${productId}`,
      payload: { name: "Updated integration keyboard" },
    });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.json<{ data: { name: string } }>().data.name).toBe(
      "Updated integration keyboard",
    );

    const listResponse = await app.inject({
      method: "GET",
      url: "/api/products?limit=100",
    });

    expect(listResponse.statusCode).toBe(200);
    expect(
      listResponse.json<{ data: Array<{ id: number }> }>().data.some((item) => item.id === productId),
    ).toBe(true);

    const deleteResponse = await app.inject({
      method: "DELETE",
      url: `/api/products/${productId}`,
    });

    expect(deleteResponse.statusCode).toBe(200);

    const missingResponse = await app.inject({
      method: "GET",
      url: `/api/products/${productId}`,
    });

    expect(missingResponse.statusCode).toBe(404);
  });

  it("prevents deleting a category with active products", async () => {
    const categoryResponse = await app.inject({
      method: "POST",
      url: "/api/categories",
      payload: { name: `${categoryName} protected` },
    });
    const protectedCategoryId = categoryResponse.json<{ data: { id: number } }>().data.id;

    const productResponse = await app.inject({
      method: "POST",
      url: "/api/products",
      payload: { name: "Protected integration product", category_id: protectedCategoryId },
    });
    const protectedProductId = productResponse.json<{ data: { id: number } }>().data.id;

    const deleteCategoryResponse = await app.inject({
      method: "DELETE",
      url: `/api/categories/${protectedCategoryId}`,
    });

    expect(deleteCategoryResponse.statusCode).toBe(409);

    await prisma.product.deleteMany({ where: { id: protectedProductId } });
    await prisma.category.deleteMany({ where: { id: protectedCategoryId } });
  });
});
