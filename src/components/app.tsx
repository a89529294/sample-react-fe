import { AuthProvider } from "../auth/auth-provider";
import { InnerApp } from "./inner-app";

export function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
