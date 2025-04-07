import React from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sessionToken: string | null;
  userId: string | null;
  username: string | null;
}

export const AuthContext = React.createContext<AuthContext | null>(null);
