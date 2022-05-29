import { z } from "zod";

import { linksSchema } from "../__generated__/entities";

export type ILink = z.infer<typeof linksSchema>;
