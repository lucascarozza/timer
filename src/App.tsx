// External libraries
import { BrowserRouter } from "react-router-dom";
// Internal utilities
import { Router } from "./Router";
// Context providers
import { CyclesContextProvider } from "./contexts/CyclesContext";
// Styles
import { GlobalStyle } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <CyclesContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CyclesContextProvider>
    </ThemeProvider>
  );
}
