import { LinkModel, ProjectModel, UsersOnProjectsModel } from "prisma/zod";
import { z } from "zod";

import { isIsoDate } from "@/util/regex";

export const CreateProjectModel = ProjectModel.omit({ id: true, createdAt: true, updatedAt: true })
  .partial({
    generation: true,
    is_available: true,
    is_founding: true,
  })
  .extend({
    links: z.array(LinkModel.omit({ id: true, project_id: true })),
    users: z.array(UsersOnProjectsModel.omit({ id: true, project_id: true })),
    start_at: z.string().refine(isIsoDate),
    end_at: z.string().refine(isIsoDate).optional(),
  });
export type CreateProjectModelType = z.infer<typeof CreateProjectModel>;

export const UpdateProjectModel = ProjectModel.omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    links: z.array(LinkModel.omit({ project_id: true })),
    users: z.array(UsersOnProjectsModel.omit({ project_id: true })),
    start_at: z.string().refine(isIsoDate),
    end_at: z.string().refine(isIsoDate).optional(),
  })
  .partial();
export type UpdateProjectModelType = z.infer<typeof UpdateProjectModel>;
