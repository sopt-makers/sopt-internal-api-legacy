import { z } from "zod";

import { projectsSchema } from "../__generated__/entities";

export type IProject = z.infer<typeof projectsSchema>;
