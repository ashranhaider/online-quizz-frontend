export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  email: string | null;
  token: string | null;
}