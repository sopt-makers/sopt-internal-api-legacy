export interface AccessTokenManager {
  verify: (token: string) => void;
}
