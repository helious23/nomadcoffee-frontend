import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import routes from "./routes";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { offsetLimitPagination } from "@apollo/client/utilities";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const profileVar = makeVar(false);
export const scrollVar = makeVar(false);

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enable");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history?: any) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  history?.replace(routes.home, null);
  window.location.reload();
};

export const onMenuClose = (visible: boolean) => {
  if (visible) {
    profileVar(false);
  }
};

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://nomad-coffee-backend-challenge.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
  // :"https://nomad-coffee-backend-challenge.herokuapp.com/graphql"
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log(`Network Error`, networkError);
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache: new InMemoryCache({
    typePolicies: {
      // User: {
      //   keyFields: (obj) => `User:${obj.username}`,
      // },
      Query: {
        fields: {
          seeCoffeeShops: offsetLimitPagination(),
        },
      },
    },
  }),
});
