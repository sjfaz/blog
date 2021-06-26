import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Config from "../blog-config";
import "../styles/global.scss";

const maxHeight = { height: "100%", minHeight: "100%" };
const overrides = {
  styles: { global: { html: maxHeight, body: maxHeight } },
  colors: {
    primary: {
      50: Config.colors.primary.replace("1.0", "0.1"),
      100: Config.colors.primary.replace("1.0", "0.5"),
      500: Config.colors.primary.replace("1.0", "0.9"),
      1000: Config.colors.primary,
    },
    secondary: {
      50: Config.colors.secondary.replace("1.0", "0.1"),
      100: Config.colors.secondary.replace("1.0", "0.5"),
      500: Config.colors.secondary.replace("1.0", "0.9"),
      1000: Config.colors.secondary,
    },
    black: {
      50: "rgb(0, 0, 0, 1.0)",
      100: "rgb(0, 0, 0, 1.0)",
      500: "rgb(0, 0, 0, 1.0)",
    },
  },
};

const theme = extendTheme(overrides);

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ChakraProvider theme={theme}>
      {/* <CSSReset /> */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default App;
