import { z } from "zod";

import { isIsoDate } from "@/util/regex";

export const Project = z.object({
  category: z.string(),
  detail: z.string(),
  end_at: z.string().refine(isIsoDate).nullable().optional(),
  generation: z.number().nullable().optional(),
  id: z.number(),
  images: z.array(z.string()).nullable().optional(),
  is_available: z.boolean().nullable().optional(),
  is_founding: z.boolean().nullable().optional(),
  name: z.string(),
  service_type: z.array(z.string()),
  start_at: z.string().refine(isIsoDate),
  summary: z.string(),
  thumbnail_image: z.string(),
});
