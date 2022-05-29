import { Router } from "express";
import { z } from "zod";

import { Services } from "@/application/service";
import { linksSchema, projectsSchema } from "@/domain/__generated__/entities";
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
        body: projectsSchema.extend({
          links: z.array(linksSchema.omit({ project_id: true })),
        }),
      }),
    ),
    asyncRoute(controllers.createProject),
  );

  router.put(
    "/:id",
    validate(
      z.object({
        body: projectsSchema.partial(),
      }),
    ),
    asyncRoute(controllers.updateProject),
  );

  router.delete("/:id", asyncRoute(controllers.deleteProject));

  return router;
}
