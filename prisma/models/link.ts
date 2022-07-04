import * as z from "zod";
import { CompleteProject, RelatedProjectModel } from "./index";

export const LinkModel = z.object({
  project_id: z.number().int(),
  title: z.string(),
  url: z.string(),
  id: z.number().int(),
});

export interface CompleteLink extends z.infer<typeof LinkModel> {
  project: CompleteProject;
}

/**
 * RelatedLinkModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLinkModel: z.ZodSchema<CompleteLink> = z.lazy(() =>
  LinkModel.extend({
    project: RelatedProjectModel,
  }),
);
