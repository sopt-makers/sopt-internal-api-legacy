import { z } from "zod";

import { UserModel } from "~/models";

export const CreateUserModel = UserModel.omit({ id: true });
export type CreateUserModelType = z.infer<typeof CreateUserModel>;
