import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/components/layout/layout";
import { SessionProvider } from "next-auth/react";
import {trpc} from "@/utils/trpc";

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
