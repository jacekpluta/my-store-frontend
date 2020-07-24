import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8"></meta>
      <link rel="shortcut icon" href="/static/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <title>MyStore</title>
    </Head>
  );
};

export default Meta;
