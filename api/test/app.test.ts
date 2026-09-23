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

  it("keeps the public ping contract", async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({ method: "GET", url: "/ping" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: "pong" });

    await app.close();
  });
});
