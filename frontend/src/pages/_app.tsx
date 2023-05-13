import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { StoreProvider } from "easy-peasy";
import { ToastContainer } from "react-toastify";
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
        <ToastContainer position="top-center" limit={1} autoClose={900} />
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
