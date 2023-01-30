import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script src="https://cdn.tailwindcss.com?plugins=typography"></Script>
      <Component {...pageProps} />
    </>
  );
}
