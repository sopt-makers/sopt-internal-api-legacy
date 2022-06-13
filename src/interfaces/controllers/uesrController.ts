import { Request, Response } from "express";

import { Services } from "@/application/service";
import { CreateUserModelType } from "@/domain/validators/user";

interface UserController {
  createUser: (req: Request<{}, {}, CreateUserModelType>, res: Response) => Promise<void>;
  getUserById: (req: Request, res: Response) => Promise<void>;
  getUsersByName: (req: Request<{}, {}, {}, { name: string }>, res: Response) => Promise<void>;
}

interface UserControllerDeps {
  services: Services;
}

export const createUserController = ({ services }: UserControllerDeps): UserController => {
  return {
    getUserById: async (req, res) => {
      const { id } = req.params;
      const user = await services.user.getUser(id);

      res.json(user);
    },
    getUsersByName: async (req, res) => {
      const { name } = req.query;
      const users = await services.user.getUsersByName(name);

      res.json(users);
    },
    createUser: async (req, res) => {
      const user = await services.user.createUser(req.body);

      res.status(201).json(user);
    },
  };
};
