import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    isDarkMode: boolean;
    colors: {
      bgMain: string;
      bgSec: string;
      textMain: string;
      textSec: string;
      primary: string;
      red: string;
      green: string;
      blue: string;
    };
  }
}
