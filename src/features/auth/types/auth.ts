export interface AuthenticationRequest {
  email: string;
  password: string;
}
export interface AuthenticatedUser {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  email: string | null;
}
export interface AuthenticationResponse {
  user: AuthenticatedUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: Date | null;
}
export interface RefreshTokenRequest {
  refreshToken: string;
}