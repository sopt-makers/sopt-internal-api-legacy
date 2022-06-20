import { Router } from "express";

import { asyncRoute } from "@/util/route";

import { createPresignedUrlController } from "../controllers/presignedUrlController";

export function createPresignedUrlRoutes() {
  const router = Router();
  const controller = createPresignedUrlController();

  router.get("/", asyncRoute(controller.createPresignedUrl));

  return router;
}
