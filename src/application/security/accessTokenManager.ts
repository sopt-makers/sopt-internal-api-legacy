export interface AccessTokenManager {
  verify: (token: string) => { userId: number };
}
