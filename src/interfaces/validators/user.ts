import { UserModel } from "prisma/zod";

export const CreateUserModel = UserModel.omit({ id: true });
