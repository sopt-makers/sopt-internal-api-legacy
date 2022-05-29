import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import path from "path";

import { createServices } from "@/application/service";
import { bootstrap } from "@/infrastructure/config/bootstrap";
import { createRepository } from "@/infrastructure/repository";
import { createRoutes } from "@/interfaces/routes";
import { createProjectRoutes } from "@/interfaces/routes/project";
import { createUserRoutes } from "@/interfaces/routes/users";
import { AppError } from "@/util/error/AppError";

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
  app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(_err);
    if (_err instanceof AppError) {
      return res.status(_err.httpCode).json({ name: _err.name, message: _err.message });
    }
    return res.status(500).json({ message: "internal error" });
  });

  return app;
}
