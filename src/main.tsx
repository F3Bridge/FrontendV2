import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import Web3Provider from "./components/Web3Provider";
import "./index.css";

import { store } from "./store";
import { setupAxiosInterceptors } from "./utils";

setupAxiosInterceptors(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Web3Provider>
    </Provider>
  </React.StrictMode>
);
