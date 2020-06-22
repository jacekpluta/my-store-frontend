import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apollo";
import React from "react";
import Page from "../components/Page";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}
