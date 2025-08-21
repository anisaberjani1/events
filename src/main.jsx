import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/UserContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-x758hjf7v2dv4s8f.us.auth0.com"
        clientId="qvW2hgVQGGSf4T0Ozdz86jwR6ofnB5RV"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <App />
          </UserProvider>
        </QueryClientProvider>
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
);
