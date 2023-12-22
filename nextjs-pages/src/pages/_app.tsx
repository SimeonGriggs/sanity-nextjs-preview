// ./src/pages/_app.tsx

import "@/styles/globals.css";

import { AppProps } from "next/app";
import { lazy, Suspense } from "react";

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
}

const PreviewProvider = lazy(() => import("@/components/PreviewProvider"));
const VisualEditing = lazy(() => import("@/components/VisualEditing"));

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps;
  
  return draftMode ? (
    <PreviewProvider token={token}>
      <Component {...pageProps} />
      <Suspense>
        <VisualEditing />
      </Suspense>
    </PreviewProvider>
  ) : (
    <Component {...pageProps} />
  );
}