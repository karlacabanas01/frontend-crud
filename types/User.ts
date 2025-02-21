export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}
export interface LoginResponse {
  token: string;
  user: User;
}
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}
export interface TokenPayload {
  id: number;
  email: string;
  username: string;
}
