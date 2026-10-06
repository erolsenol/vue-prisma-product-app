import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildApp } from "../src/app";

const mocks = vi.hoisted(() => ({
  findFirst: vi.fn(), update: vi.fn(), save: vi.fn(), remove: vi.fn(),
}));
vi.mock("../prisma", () => ({ default: {
  product: { findFirst: mocks.findFirst, update: mocks.update },
  category: { findFirst: mocks.findFirst, update: mocks.update },
  $disconnect: vi.fn(),
} }));
vi.mock("../src/helpers", async (importOriginal) => ({
  ...await importOriginal<typeof import("../src/helpers")>(),
  pictureSave: mocks.save, pictureDelete: mocks.remove,
}));

describe.each(["products", "categories"])("%s picture updates", (resource) => {
  let app: Awaited<ReturnType<typeof buildApp>>;
  beforeEach(async () => {
    vi.resetAllMocks();
    mocks.findFirst.mockResolvedValue({ id: 1, name: "Item", picture: "old.png" });
    mocks.save.mockResolvedValue(true);
    mocks.update.mockResolvedValue({ id: 1, name: "Item" });
    mocks.remove.mockResolvedValue(true);
    app = await buildApp({ logger: false });
  });
  afterEach(async () => { await app.close(); });
  const update = (filename: string) => app.inject({
    method: "PUT", url: `/api/${resource}/1`,
    payload: { picture: "data:image/png;base64,aGVsbG8=", picture_name: filename },
  });
  it("keeps an image replaced using the same filename", async () => {
    expect((await update("old.png")).statusCode).toBe(200);
    expect(mocks.save).toHaveBeenCalledOnce();
    expect(mocks.remove).not.toHaveBeenCalled();
  });
  it("removes a different old image only after the database update", async () => {
    expect((await update("new.png")).statusCode).toBe(200);
    expect(mocks.remove).toHaveBeenCalledWith("old.png", resource === "products" ? "product" : "category");
    expect(mocks.update.mock.invocationCallOrder[0]).toBeLessThan(mocks.remove.mock.invocationCallOrder[0]);
  });
  it("preserves the old image when the database update fails", async () => {
    mocks.update.mockRejectedValue(new Error("Database unavailable"));
    expect((await update("new.png")).statusCode).toBe(500);
    expect(mocks.remove).not.toHaveBeenCalled();
  });
});
