import { AppProps } from "next/app";
import { ApolloProvider } from "react-apollo";
import { useApollo } from "../lib/apollo";
import React from "react";
import Page from "../components/page";

declare type pageProps = {
  query?: "string";
};

App.getInitialProps = async ({ Component, ctx }) => {
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
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

export default App;
