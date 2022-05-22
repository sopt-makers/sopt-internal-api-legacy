import express from "express";
import logger from "morgan";
import path from "path";

import { createServices } from "@/application/service";
import { bootstrap } from "@/infrastructure/config/bootstrap";
import { createRepository } from "@/infrastructure/repository";
import { createRoutes } from "@/interfaces/routes";
import { createProjectRoutes } from "@/interfaces/routes/project";
import { createUserRoutes } from "@/interfaces/routes/users";

export async function createServer() {
  const app = express();

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));

  const db = await bootstrap();

  // TODO: inject repository by service locator
  const repository = createRepository({ db });
  const services = createServices({ repository });

  app.use("/api/v1/hello", createRoutes({ services }));
  app.use("/api/v1/users", createUserRoutes({ services }));
  app.use("/api/v1/projects", createProjectRoutes({ services }));

  return app;
}
