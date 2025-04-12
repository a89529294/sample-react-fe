import React from "react";
import { type TrpcTypes } from "@/common/trpc-api";

export interface AuthContext {
  isAuthenticated: boolean;
  sessionToken: string | null;
  user: TrpcTypes["User"] | null;
  logout: () => Promise<void>;
  login: (
    account: string,
    password: string,
    onSuccess: () => void,
    onError?: () => void
  ) => Promise<void>;
  me: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContext | null>(null);
