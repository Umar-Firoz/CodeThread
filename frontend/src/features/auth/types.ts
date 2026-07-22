export interface User {
  email: string;
}

export interface AuthResponse {
  token: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password?: string;
}
