import { Router } from "express";
import { z } from "zod";

import authMiddleware from "@/infrastructure/webserver/middlewares/auth";
import { asyncRoute } from "@/util/route";
import { validate } from "@/util/validate";

import { createPresignedUrlController } from "../controllers/presignedUrlController";

export function createPresignedUrlRoutes() {
  const router = Router();
  const controller = createPresignedUrlController();

  router.get(
    "/",
    authMiddleware,
    validate(
      z.object({
        query: z.object({ filename: z.string() }),
      }),
    ),
    asyncRoute(controller.createPresignedUrl),
  );

  return router;
}
