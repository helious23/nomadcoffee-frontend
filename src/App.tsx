import React from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { client, darkModeVar, isLoggedInVar, scrollVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import LoggedInRouter from "./router/LoggedInRouter";
import LoggedOutRouter from "./router/LoggedOutRouter";
import KakaoDaumAPi from "./components/KakaoDaumAPi";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  const scroll = useReactiveVar(scrollVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <KakaoDaumAPi />
          <GlobalStyles scroll={scroll} />
          {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
