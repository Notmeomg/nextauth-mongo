import React from "react";
import { Provider } from "next-auth/client";
import PropTypes from "prop-types";
import "../styles/globals.css";

function App({ Component, pageProps = {} }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default App;
