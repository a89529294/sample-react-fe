import { trpcApiClient, type TrpcTypes } from "@/common/trpc-api";
import * as React from "react";
import { AuthContext } from ".";
import { URL_PREFIX, router } from "../constants";

type StoredAuth = {
  user: TrpcTypes["User"];
  sessionToken: string;
};

const userKey = "tanstack.auth.user";
export const sessionTokenKey = "tanstack.auth.session.token";

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
  ) as TrpcTypes["User"];

  return {
    user: userFromLocalStorage,
    sessionToken: localStorage.getItem(sessionTokenKey)!,
  };
}

function setStoredAuth(storedAuth: StoredAuth | null) {
  if (storedAuth) {
    localStorage.setItem(userKey, JSON.stringify(storedAuth.user));
    localStorage.setItem(sessionTokenKey, storedAuth.sessionToken);
  } else {
    localStorage.removeItem(userKey);
    localStorage.removeItem(sessionTokenKey);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = React.useState<StoredAuth | null>(getStoredAuth());
  const isAuthenticated = !!auth;
  const { mutate: trcpLogin } = trpcApiClient.login.useMutation();
  const { mutate: fetchUserInfo } = trpcApiClient.me.useMutation();

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

  const login: AuthContext["login"] = React.useCallback(
    async (account, password, onSuccess, onError) => {
      trcpLogin(
        { account: account, password: password },
        {
          onSuccess: (data) => {
            console.log(data);

            setAuth({
              sessionToken: data.sessionToken,
              user: data.user,
            });
            setStoredAuth({
              sessionToken: data.sessionToken,
              user: data.user,
            });
            onSuccess();
          },
          onError: (error) => {
            console.error(error);
            if (onError) onError();
          },
        }
      );

      // const r = await fetch(`${URL_PREFIX}/login`, {
      //   method: "POST",
      //   body: JSON.stringify({ account, password }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // const response = (await r.json()) as {
      //   success: true;
      //   message: "Login successful";
      //   sessionToken: string;
      //   user: User;
      // };

      // if (!r.ok) {
      //   throw new Error("Unable to login");
      // }

      // const newAuth = {
      //   sessionToken: response.sessionToken,
      //   user: response.user,
      // };

      // setStoredAuth(newAuth);
      // setAuth(newAuth);
    },
    [trcpLogin]
  );

  const me = React.useCallback(async () => {
    await fetchUserInfo(undefined, {
      onSuccess: () => {},
      onError: () => {
        setStoredAuth(null);
        setAuth(null);

        router.navigate({ to: "/login" });
      },
    });

    // const r = await fetch(`${URL_PREFIX}/me`, {
    //   headers: {
    //     Authorization: `Bearer ${sessionToken}`,
    //   },
    // });
    // if (!r.ok) {
    //   setStoredAuth(null);
    //   setAuth(null);
    //   throw new Error("No active session or user");
    // }
    // const { user } = (await r.json()) as {
    //   succes: true;
    //   user: User;
    // };
    // setStoredAuth({
    //   sessionToken: sessionToken!,
    //   user: user,
    // });
    // setAuth({
    //   sessionToken: sessionToken!,
    //   user: user,
    // });
  }, [fetchUserInfo]);

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
