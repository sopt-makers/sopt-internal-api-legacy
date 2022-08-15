import express from "express";

import { createAccessTokenManager } from "@/infrastructure/security/JwtAccessTokenManager";

const authMiddleware = express.Router();
// TODO: inject token manager
const tokenManager = createAccessTokenManager();

// a middleware function with no mount path. This code is executed for every request to the router
authMiddleware.use((req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.sendStatus(401);
  }

  const token = authorization.replace(/Bearer/gi, "").replace(/ /g, "");

  try {
    const { userId } = tokenManager.verify(token);
    res.locals.authUserId = userId;
    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.sendStatus(401);
  }
});

export default authMiddleware;
