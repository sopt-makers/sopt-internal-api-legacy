import { Router } from "express";
import { z } from "zod";

import { Services } from "@/application/service";
import { asyncRoute } from "@/util/route";
import { validate } from "@/util/validate";

import { CreateUserModel } from "../validators/user";

interface CreateRoutesDeps {
  services: Services;
}

export function createUserRoutes({ services }: CreateRoutesDeps) {
  const router = Router();

  router.get(
    "/:id",
    asyncRoute(async (req, res) => {
      const { id } = req.params;
      const ret = await services.user.getUser(id);

      res.json({
        user: ret,
      });
    }),
  );

  router.post(
    "/",
    validate(
      z.object({
        body: CreateUserModel,
      }),
    ),
    asyncRoute(async (req, res) => {
      const createdUser = await services.user.createUser(req.body);
      res.json(createdUser);
    }),
  );

  return router;
}
