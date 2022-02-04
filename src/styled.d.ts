import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    accent: string;
    boxBgColor: string;
    borderColor: string;
    formBgColor: string;
    fontColor: string;
    bgColor: string;
    facebookColor: string;
    placeholderFontColor: string;
  }
}
