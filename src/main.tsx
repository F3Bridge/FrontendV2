import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Web3Provider from "./components/Web3Provider";
import { BrowserRouter } from "react-router-dom";

const APIURL = "https://api-mumbai.lens.dev/";

const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3Provider>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Web3Provider>
  </React.StrictMode>
);
