import React, { useContext } from "react";
import { ThemeContext } from "../App";
import Toggle from "../styled/Toggle";

const ThemeTogglerButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  return <Toggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
};

export default ThemeTogglerButton;
