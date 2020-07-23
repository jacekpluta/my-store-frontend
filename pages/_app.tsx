import { AppProps } from "next/app";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from "@apollo/react-hooks";
import { useApollo } from "../lib/apollo";
import React from "react";
import Page from "../components/page";

interface pageProps {
  query?: string;
}

App.getInitialProps = async ({ Component, ctx }: any) => {
  let pageProps: pageProps = {};
  //crowls queires and mutation that need to be fetched
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  //exposes query to the user
  pageProps.query = ctx.query;
  return { pageProps };
};

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProviderHooks client={apolloClient}>
      <ApolloProvider client={apolloClient}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </ApolloProviderHooks>
  );
}

export default App;
