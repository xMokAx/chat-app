import "styled-components";
import { DefaultTheme } from "styled-components";

/// <reference path="node\_modules/@types/styled-components/index.d.ts"/>
declare module "styled-components" {
  export interface DefaultTheme {
    isDarkMode: boolean;
    colors: {
      bgMain: string;
      bgSec: string;
      textMain: string;
      textSec: string;
      primary: "#d63667";
      red: "#e91608";
      green: "#008906";
      blue: "#0670f1";
      grey: "#757575";
    };
  }
}

/// <reference path="node\_modules/@types/react/index.d.ts"/>
declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp;
  }
}
