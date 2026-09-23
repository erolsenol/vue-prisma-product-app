import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app";

describe("API application", () => {
  it("returns a liveness response without requiring the database", async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({ method: "GET", url: "/health/live" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "ok" });

    await app.close();
  });

  it("enforces the configured request rate limit", async () => {
    const app = await buildApp({ logger: false, rateLimitMax: 1, rateLimitTimeWindow: "1 minute" });

    const firstResponse = await app.inject({ method: "GET", url: "/ping" });
    const limitedResponse = await app.inject({ method: "GET", url: "/ping" });

    expect(firstResponse.statusCode).toBe(200);
    expect(limitedResponse.statusCode).toBe(429);

    await app.close();
  });

  it("keeps the public ping contract", async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({ method: "GET", url: "/ping" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: "pong" });

    await app.close();
  });

  it("rejects invalid pagination before reaching the database", async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: "GET",
      url: "/api/products?page=0&limit=101",
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().message).toBe("Request validation failed");

    await app.close();
  });

  it("rejects empty product names before reaching the database", async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: "POST",
      url: "/api/products",
      payload: { name: "", category_id: 1 },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().message).toBe("Request validation failed");

    await app.close();
  });

  it("rejects non-positive foreign keys before reaching the database", async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: "POST",
      url: "/api/products",
      payload: { name: "Keyboard", category_id: 0 },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().message).toBe("Request validation failed");

    await app.close();
  });

  it("rejects unsafe picture names before reaching the database", async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: "POST",
      url: "/api/products",
      payload: { name: "Keyboard", category_id: 1, picture_name: "../secret.txt" },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().message).toBe("Request validation failed");

    await app.close();
  });

  it("rejects fractional category IDs before reaching the database", async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: "POST",
      url: "/api/products",
      payload: { name: "Keyboard", category_id: 1.5 },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().message).toBe("Request validation failed");

    await app.close();
  });

  it("rejects invalid image payloads before reaching the database", async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: "POST",
      url: "/api/products",
      payload: {
        name: "Keyboard",
        category_id: 1,
        picture: "data:text/plain;base64,SGVsbG8=",
        picture_name: "keyboard.txt",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({ message: "Invalid picture payload" });

    await app.close();
  });
});
