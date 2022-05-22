import jwt from "jsonwebtoken";

import { AccessTokenManager } from "@/application/security/accessTokenManager";

const secret = process.env.JWT_SECRET;

export class JwtAccessTokenManager implements AccessTokenManager {
  verify(token: string) {
    return jwt.verify(token, secret ?? "DEV_SECRET");
  }
}
