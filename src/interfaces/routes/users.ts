import { Router } from "express";
import { z } from "zod";

import { Services } from "@/application/service";
import { asyncRoute } from "@/util/route";
import { validate } from "@/util/validate";

import { CreateUserModel } from "../../domain/validators/user";
import { createUserController } from "../controllers/uesrController";

interface CreateRoutesDeps {
  services: Services;
}

export function createUserRoutes({ services }: CreateRoutesDeps) {
  const router = Router();
  const userController = createUserController({ services });

  router.get(
    "/search",
    validate(
      z.object({
        query: z.object({ name: z.string() }),
      }),
    ),
    asyncRoute(userController.getUsersByName),
  );

  router.get("/:id", asyncRoute(userController.getUserById));

  router.post(
    "/",
    validate(
      z.object({
        body: CreateUserModel,
      }),
    ),
    asyncRoute(userController.createUser),
  );

  return router;
}
