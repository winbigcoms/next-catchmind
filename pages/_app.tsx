import { NextPage } from "next";
import { AppProps } from "next/dist/shared/lib/router/router";
import { ThemeProvider } from "styled-components";
import warpper from "../store/index";
import { theme } from "../src/styles/theme";
import { GlobalStyle } from "../src/styles/global-styles";

const WrappedComponent: NextPage<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default warpper.withRedux(WrappedComponent);
