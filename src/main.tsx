import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { App } from "./components/app";
import { router } from "./constants";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
