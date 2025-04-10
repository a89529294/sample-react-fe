import * as React from "react";
import { URL_PREFIX } from "../constants";
import { AuthContext, User } from ".";

type StoredAuth = {
  user: User;
  sessionToken: string;
};

const userKey = "tanstack.auth.user";
const sessionTokenKey = "tanstack.auth.session.token";

function getStoredAuth() {
  if (
    !localStorage.getItem(userKey) ||
    !localStorage.getItem(sessionTokenKey)
  ) {
    localStorage.removeItem(userKey);
    localStorage.removeItem(sessionTokenKey);
    return null;
  }

  const userFromLocalStorage = JSON.parse(
    localStorage.getItem(userKey)!
  ) as User;

  return {
    user: {
      id: userFromLocalStorage.id,
      account: userFromLocalStorage.account,
      name: userFromLocalStorage.name,
      roles: userFromLocalStorage.roles,
    },
    sessionToken: localStorage.getItem(sessionTokenKey)!,
  };
}

function setStoredAuth(storedAuth: StoredAuth | null) {
  if (storedAuth) {
    localStorage.setItem(userKey, JSON.stringify(storedAuth));
    localStorage.setItem(sessionTokenKey, storedAuth.sessionToken);
  } else {
    localStorage.removeItem(userKey);
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

  const login = React.useCallback(async (account: string, password: string) => {
    const r = await fetch(`${URL_PREFIX}/login`, {
      method: "POST",
      body: JSON.stringify({ account, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = (await r.json()) as {
      success: true;
      message: "Login successful";
      sessionToken: string;
      user: User;
    };

    if (!r.ok) {
      throw new Error("Unable to login");
    }

    const newAuth = {
      sessionToken: response.sessionToken,
      user: response.user,
    };

    setStoredAuth(newAuth);
    setAuth(newAuth);
  }, []);

  const sessionToken = auth?.sessionToken;
  const me = React.useCallback(async () => {
    const r = await fetch(`${URL_PREFIX}/me`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!r.ok) {
      setStoredAuth(null);
      setAuth(null);
      throw new Error("No active session or user");
    }

    const { user } = (await r.json()) as {
      succes: true;
      user: User;
    };

    setStoredAuth({
      sessionToken: sessionToken!,
      user: user,
    });
    setAuth({
      sessionToken: sessionToken!,
      user: user,
    });
  }, [sessionToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        sessionToken: auth?.sessionToken ?? null,
        user: auth?.user ?? null,
        login,
        logout,
        me,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
