import { Router } from "express";
import { ProjectModel } from "prisma/zod";
import { z } from "zod";

import { Services } from "@/application/service";
import { CreateProjectModel } from "@/domain/validators/project";
import { createProjectController } from "@/interfaces/controllers/projectController";
import { asyncRoute } from "@/util/route";
import { validate } from "@/util/validate";

interface CreateProjectRouteDeps {
  services: Services;
}

export function createProjectRoutes({ services }: CreateProjectRouteDeps) {
  const router = Router();
  const controllers = createProjectController({ services });

  router.get("/", asyncRoute(controllers.listProjects));

  router.get("/:id", asyncRoute(controllers.getProject));

  router.post(
    "/",
    validate(
      z.object({
        body: CreateProjectModel,
      }),
    ),
    asyncRoute(controllers.createProject),
  );

  router.put(
    "/:id",
    validate(
      z.object({
        body: ProjectModel.partial(),
      }),
    ),
    asyncRoute(controllers.updateProject),
  );

  router.delete("/:id", asyncRoute(controllers.deleteProject));

  return router;
}
