import React from "react";
import "reflect-metadata";
import { Provider } from "next-auth/client";
import PropTypes from "prop-types";
// import { AuthProvider } from "../contexts/Auth";
import "../styles/globals.css";

function App({ Component, pageProps = {} }) {
  // return (
  //   <AuthProvider>
  //     <Component {...pageProps} />
  //   </AuthProvider>
  // );
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};

export default App;
