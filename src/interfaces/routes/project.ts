import { Router } from "express";
import { z } from "zod";

import { Services } from "@/application/service";
import { projectsSchema } from "@/domain/__generated__/entities";
import { asyncRoute } from "@/util/route";
import { validate } from "@/util/validate";

interface CreateProjectRouteDeps {
  services: Services;
}

export function createProjectRoutes({ services }: CreateProjectRouteDeps) {
  const router = Router();

  router.get(
    "/",
    asyncRoute(async (_req, res) => {
      const projects = await services.project.listProjects();

      res.json({
        projects,
      });
    }),
  );
  router.post(
    "/",
    validate(
      z.object({
        body: projectsSchema,
      }),
    ),
    asyncRoute(async (req, res) => {
      const validProjectParams = projectsSchema.parse(req.body);
      const project = await services.project.createProject(validProjectParams);

      res.status(201).json({
        ...project,
      });
    }),
  );
  router.put(
    "/:id",
    validate(
      z.object({
        body: projectsSchema.partial(),
      }),
    ),
    asyncRoute(async (req, res) => {
      const id = Number(req.params.id);
      const project = await services.project.updateProject(id, req.body);

      res.status(201).json({
        ...project,
      });
    }),
  );
  router.delete(
    "/:id",
    asyncRoute(async (req, res) => {
      const id = Number(req.params.id);
      await services.project.deleteProject(id);

      res.status(204).send();
    }),
  );

  return router;
}
