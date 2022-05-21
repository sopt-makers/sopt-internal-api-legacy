import express from "express";

import { createServices } from "@/application/service";
import { bootstrap } from "@/infrastructure/config/bootstrap";
import { createRepository } from "@/infrastructure/repository";
import { createRoutes } from "@/interfaces/route";

export async function createServer() {
  const app = express();

  const db = await bootstrap();

  // TODO: inject repository by service locator
  const repository = createRepository({ db });

  const services = createServices({ repository });

  app.use("/api/v1", createRoutes({ services }));

  return app;
}
