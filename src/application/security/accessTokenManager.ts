export interface AccessTokenManager {
  verify: ({ token, isAdmin }: { token: string; isAdmin?: boolean }) => { userId: number };
}
