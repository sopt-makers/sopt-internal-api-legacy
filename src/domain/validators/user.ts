import { UserModel } from "prisma/zod";
import { z } from "zod";

export const CreateUserModel = UserModel.omit({ id: true });
export type CreateUserModelType = z.infer<typeof CreateUserModel>;
