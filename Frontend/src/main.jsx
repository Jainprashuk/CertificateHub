import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Hero from "./Components/Hero.jsx";
import { Auth0Provider } from '@auth0/auth0-react';
import MainApp from "./Components/MainApp.jsx";
import Sample from "./Components/SampleBackend.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-jcknc2ydq87meifz.us.auth0.com"
    clientId="GIfenwRo95FrdSX30CD7TMOCW7Qoibdc"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    
      {/* <App />
      <Hero /> */}

      <MainApp/>

      {/* <Sample/> */}
    
  </Auth0Provider>
);
