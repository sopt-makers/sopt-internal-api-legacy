import express from "express";
import { z } from "zod";

import { JwtAccessTokenManager } from "@/infrastructure/security/JwtAccessTokenManager";

const authMiddleware = express.Router();
// TODO: inject token manager
const tokenManager = new JwtAccessTokenManager();

// a middleware function with no mount path. This code is executed for every request to the router
authMiddleware.use((req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.sendStatus(401);
  }

  const token = authorization.replace(/Bearer/gi, "").replace(/ /g, "");

  try {
    const decoded = tokenManager.verify(token);

    const validator = z.object({
      iss: z.string(),
      sub: z.string(),
    });

    const info = validator.parse(decoded);
    const userId = info.sub.split("|")[1];
    // NOTE: set userId into res.locals
    res.locals.userId = userId;
    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(401);
  }
});
