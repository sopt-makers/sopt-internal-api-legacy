import { Request, Response } from "express";

import { Services } from "@/application/service";

interface ProjectController {
  createProject: (req: Request, res: Response) => Promise<void>;
  listProjects: (req: Request, res: Response) => Promise<void>;
  updateProject: (req: Request, res: Response) => Promise<void>;
  deleteProject: (req: Request, res: Response) => Promise<void>;
}

interface ProjectControllerDeps {
  services: Services;
}

export const createProjectController = ({ services }: ProjectControllerDeps): ProjectController => {
  return {
    createProject: async (req, res) => {
      const project = await services.project.createProject(req.body);

      res.status(201).json({
        ...project,
      });
    },
    listProjects: async (_req, res) => {
      const projects = await services.project.listProjects();

      res.json({
        projects,
      });
    },
    updateProject: async (req, res) => {
      const id = Number(req.params.id);
      const project = await services.project.updateProject(id, req.body);

      res.status(201).json({
        ...project,
      });
    },
    deleteProject: async (req, res) => {
      const id = Number(req.params.id);
      await services.project.deleteProject(id);

      res.status(204).send();
    },
  };
};
