export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  userName: string | null;
  login: (email: string, password: string) => Promise<void>; // <-- Corrección aquí
  logout: () => void;
}

export interface LoginResponse {
  token: string;
  user: User;
}
export interface TokenPayload {
  id: number;
  email: string;
  name: string;
}
