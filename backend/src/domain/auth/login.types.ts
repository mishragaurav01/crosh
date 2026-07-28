export interface LoginRequest {
  email: string;
  password: string;
}

export interface RoleSummary {
  id: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: RoleSummary[];
  };
}
