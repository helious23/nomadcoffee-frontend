import reset from "styled-reset";
import { createGlobalStyle, DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  accent: "#744924",
  borderColor: "rgba(255,255,255,0.3)",
  boxBgColor: "black",
  formBgColor: "rgba(255,255,255,0.3)",
  fontColor: "lightgray",
  bgColor: "#000",
  facebookColor: "#385285",
  placeholderFontColor: "grey",
  menuBgColor: "#3c311f",
  linkColor: "rgb(59, 130, 246)",
  textGrey: "grey",
};

export const lightTheme: DefaultTheme = {
  accent: "#c28d4b",
  borderColor: "rgb(219,219,219)",
  boxBgColor: "white",
  formBgColor: "#fafafa",
  fontColor: "rgb(38,38,38)",
  bgColor: "#FAFAFA",
  facebookColor: "#385285",
  placeholderFontColor: "grey",
  menuBgColor: "#f5f6fa",
  linkColor: "rgb(59, 130, 246)",
  textGrey: "grey",
};

export const GlobalStyles = createGlobalStyle<{ scroll: boolean }>`
    ${reset}
    input {
      :focus{
        outline: none;
      }
    }
    *{
        box-sizing: border-box;
    }
    body{
        background-color: ${(props) => props.theme.bgColor};
        font-size: 0.9rem;
        font-weight: 400;
        font-family: 'Open Sans', sans-serif;
        color: ${(props) => props.theme.fontColor};
        transition: all 0.5s ease-in-out;
        font-family: 'IBM Plex Sans KR', sans-serif;
        overflow: ${(props) => (props.scroll ? "hidden" : "visible")};
    }
    a{
      text-decoration: none;
      color: inherit
    }
`;
