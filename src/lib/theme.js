import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    black: {
      500: "#222",
    },
    white: {
      500: "#f2f2f2"
    }
  }
});

export default theme;
