import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default.ts";
import { GlobalStyle } from "./styles/global.ts";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
