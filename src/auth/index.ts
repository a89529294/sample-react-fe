import React from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  sessionToken: string | null;
  user: User | null;
  logout: () => Promise<void>;
  login: (account: string, password: string) => Promise<void>;
  me: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContext | null>(null);

export type User = {
  id: string;
  account: string;
  name: string;
  roleId: string;
};
