import { Request } from "express";

export interface RequestWithBody<Body> extends Request {
  body: Body;
}
