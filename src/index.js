import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./css/main.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeContextProvider } from "./contexts/themeContext";
import { UserContextProvider } from "./contexts/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={createTheme({ direction: "rtl" })}>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>
              <ThemeContextProvider>
                <CssBaseline />
                <App />
              </ThemeContextProvider>
            </UserContextProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </React.Fragment>
);
