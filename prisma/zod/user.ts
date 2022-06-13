import * as z from "zod";
import { CompleteUsersOnProjects, RelatedUsersOnProjectsModel } from "./index";

export const UserModel = z.object({
  id: z.number().int(),
  auth_user_id: z.number().int(),
  name: z.string(),
  generation: z.number().int(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  projects: CompleteUsersOnProjects[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    projects: RelatedUsersOnProjectsModel.array(),
  }),
);
