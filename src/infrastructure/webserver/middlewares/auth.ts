import express from "express";

import { createAccessTokenManager } from "@/infrastructure/security/JwtAccessTokenManager";

const authMiddleware = express.Router();
export const adminAuthMiddleware = express.Router();

// TODO: inject token manager
const tokenManager = createAccessTokenManager();

function isValidAuthorization(authorization?: string): authorization is string {
  return !!authorization && authorization.startsWith("Bearer");
}

function parseToken(authorization: string) {
  return authorization.replace(/Bearer/gi, "").replace(/ /g, "");
}

// a middleware function with no mount path. This code is executed for every request to the router
authMiddleware.use((req, res, next) => {
  const authorization = req.headers.authorization;
  if (!isValidAuthorization(authorization)) {
    return res.sendStatus(401);
  }

  const token = parseToken(authorization);

  try {
    const { userId } = tokenManager.verify({ token });
    res.locals.authUserId = userId;
    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.sendStatus(401);
  }
});

adminAuthMiddleware.use((req, res, next) => {
  const authorization = req.headers.authorization;
  if (!isValidAuthorization(authorization)) {
    return res.sendStatus(401);
  }

  const token = parseToken(authorization);

  try {
    const { userId } = tokenManager.verify({ token, isAdmin: true });
    res.locals.authUserId = userId;
    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.sendStatus(401);
  }
});

export default authMiddleware;
