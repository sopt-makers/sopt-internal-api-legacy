import * as z from "zod";
import { CompleteProject, RelatedProjectModel, CompleteUser, RelatedUserModel } from "./index";

export const UsersOnProjectsModel = z.object({
  project_id: z.number().int(),
  user_id: z.number().int(),
  description: z.string().nullish(),
  role: z.string().nullish(),
  is_team_member: z.boolean().nullish(),
});

export interface CompleteUsersOnProjects extends z.infer<typeof UsersOnProjectsModel> {
  project: CompleteProject;
  user: CompleteUser;
}

/**
 * RelatedUsersOnProjectsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUsersOnProjectsModel: z.ZodSchema<CompleteUsersOnProjects> = z.lazy(() =>
  UsersOnProjectsModel.extend({
    project: RelatedProjectModel,
    user: RelatedUserModel,
  }),
);
