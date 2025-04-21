import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.white}
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme["blue-500"]};
  }

  body {
    background-color: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body, input, textarea, button {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }

  a, button {
    color: ${(props) => props.theme["gray-300"]};
    cursor: pointer;
  }

  input, text-area {
    cursor: text;
  }

  ul, ol {
    list-style: none;
  }
`;
