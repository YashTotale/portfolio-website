//React Imports
import React, { FC } from "react";

//Redux Imports
import { useSelector } from "react-redux";
import { getColors, getIsDarkMode, getShades, toggleDarkMode } from "./Redux";
import { useAppDispatch } from "./Store";

//Material UI Imports
import {
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
} from "@material-ui/core";
import * as muiColors from "@material-ui/core/colors";

export const alternativeFont = "Arial, sans-serif";

const Theme: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const colors = useSelector(getColors);
  const shades = useSelector(getShades);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDarkMode = useSelector(getIsDarkMode);
  if (isDarkMode === null && prefersDarkMode) {
    dispatch(toggleDarkMode(prefersDarkMode));
  }

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        arrow: {
          color: "rgb(0, 0, 0, 0.76)",
        },
        tooltip: {
          fontFamily: alternativeFont,
          fontWeight: 600,
          fontSize: "0.72rem",
          backgroundColor: "rgb(0, 0, 0, 0.76)",
        },
      },
      MuiList: {
        root: {
          fontFamily: "Roboto, sans-serif",
        },
      },
    },
    palette: {
      type: isDarkMode ? "dark" : "light",
      primary: {
        main: muiColors[colors.primary][shades.primary],
      },
      secondary: {
        main: muiColors[colors.secondary][shades.secondary],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
