import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App";
import { DBSThemeProvider } from "./theme";
import { MetaMaskProvider } from "metamask-react";

ReactDOM.render(
  <React.StrictMode>
    <DBSThemeProvider>
      <CssBaseline />
      <MetaMaskProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MetaMaskProvider>
      <ToastContainer />
    </DBSThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
