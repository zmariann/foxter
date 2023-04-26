import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { authStatus } from "@/utils/authStatus";
import { useRouter } from 'next/router'

function showLeftRightBars() {
  const router = useRouter()
  if(router.pathname == "/login" || router.pathname == "/register")
    return false;
  else
    return true;
}

export default function App({ Component, pageProps }: AppProps) {
  return showLeftRightBars() ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}
