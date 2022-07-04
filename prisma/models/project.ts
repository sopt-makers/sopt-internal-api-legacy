import * as z from "zod";
import { CompleteLink, RelatedLinkModel, CompleteUsersOnProjects, RelatedUsersOnProjectsModel } from "./index";

export const ProjectModel = z.object({
  id: z.number().int(),
  name: z.string(),
  generation: z.number().int().nullish(),
  category: z.string(),
  service_type: z.string().array(),
  start_at: z.date(),
  end_at: z.date().nullish(),
  is_available: z.boolean().nullish(),
  is_founding: z.boolean().nullish(),
  summary: z.string(),
  detail: z.string(),
  thumbnail_image: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteProject extends z.infer<typeof ProjectModel> {
  links: CompleteLink[];
  users: CompleteUsersOnProjects[];
}

/**
 * RelatedProjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectModel: z.ZodSchema<CompleteProject> = z.lazy(() =>
  ProjectModel.extend({
    links: RelatedLinkModel.array(),
    users: RelatedUsersOnProjectsModel.array(),
  }),
);
