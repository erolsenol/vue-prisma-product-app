import "dotenv/config";

import { buildApp } from "./app";

async function start(): Promise<void> {
  const app = await buildApp();
  const port = Number(process.env.PORT ?? 5001);

  try {
    await app.listen({ port, host: "0.0.0.0" });
  } catch (error) {
    app.log.error(error);
    process.exitCode = 1;
  }
}

void start();
