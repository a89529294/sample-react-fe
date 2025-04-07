import * as React from "react";
import { URL_PREFIX } from "../constants";
import { AuthContext } from ".";

type StoredAuth = {
  username: string;
  userId: string;
  sessionToken: string;
};

const userKey = "tanstack.auth.user";
const userIdKey = "tanstack.auth.user.id";
const sessionTokenKey = "tanstack.auth.session.token";

function getStoredAuth() {
  if (
    !localStorage.getItem(userKey) ||
    !localStorage.getItem(userIdKey) ||
    !localStorage.getItem(sessionTokenKey)
  ) {
    localStorage.removeItem(userKey);
    localStorage.removeItem(userIdKey);
    localStorage.removeItem(sessionTokenKey);
    return null;
  }

  return {
    username: localStorage.getItem(userKey)!,
    userId: localStorage.getItem(userIdKey)!,
    sessionToken: localStorage.getItem(sessionTokenKey)!,
  };
}

function setStoredAuth(storedAuth: StoredAuth | null) {
  if (storedAuth) {
    localStorage.setItem(userKey, storedAuth.username);
    localStorage.setItem(userIdKey, storedAuth.userId);
    localStorage.setItem(sessionTokenKey, storedAuth.sessionToken);
  } else {
    localStorage.removeItem(userKey);
    localStorage.removeItem(userIdKey);
    localStorage.removeItem(sessionTokenKey);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = React.useState<StoredAuth | null>(getStoredAuth());
  const isAuthenticated = !!auth;

  const logout = React.useCallback(async () => {
    const r = await fetch(`${URL_PREFIX}/logout`, {
      headers: {
        Authorization: `Bearer ${auth?.sessionToken}`,
      },
    });

    if (!r.ok) {
      throw new Error("Logout failed");
    }

    setStoredAuth(null);
    setAuth(null);
  }, [auth?.sessionToken]);

  const login = React.useCallback(
    async (username: string, password: string) => {
      const r = await fetch(`${URL_PREFIX}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await r.json();
      if (!r.ok) {
        throw new Error(response.error);
      }

      const newAuth = {
        username: response.username,
        userId: response.userId,
        sessionToken: response.sessionToken,
      };

      setStoredAuth(newAuth);
      setAuth(newAuth);
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        sessionToken: auth?.sessionToken ?? null,
        userId: auth?.userId ?? null,
        username: auth?.username ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
