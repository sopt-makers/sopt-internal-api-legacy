import { Users } from "@/domain/__generated__/psql";

export interface UserRepository {
  getUserByUserId(userId: string): Promise<Users | null>;
}
