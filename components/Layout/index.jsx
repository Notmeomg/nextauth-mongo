import React from "react";
import PropTypes from "prop-types";
import SlideOver from "./SlideOver";

const Layout = ({ children }) => (
  <>
    <SlideOver />
    {children}
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};
