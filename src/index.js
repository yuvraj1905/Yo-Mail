import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import { MailProviderComponent } from "./context&reducer/MailProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <MailProviderComponent>
        <Auth0Provider
          domain="dev-wtssh1005srizu0g.us.auth0.com"
          clientId="KGjHvqV0oWcqgzIbZelpF77yxBnHdF9o"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <App />
        </Auth0Provider>
      </MailProviderComponent>
    </BrowserRouter>
  </StrictMode>
);
