import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { useRouter } from "next/router";
import { StoreProvider } from "easy-peasy";
import store from "../store";

function showLeftRightBars() {
  const router = useRouter();
  if (router.pathname == "/login" || router.pathname == "/register")
    return false;
  else return true;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      {showLeftRightBars() ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </StoreProvider>
  );
}
