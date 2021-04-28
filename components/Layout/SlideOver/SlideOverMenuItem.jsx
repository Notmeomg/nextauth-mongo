import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const SlideOverMenuItem = forwardRef(({ children }, ref) => (
  <li ref={ref}>
    <Link href="/" passHref>
      <a
        href="/"
        tabIndex="0"
        className="block px-2 py-1 rounded hover:transform hover:scale-105 hover:cursor-pointer hover:bg-blue-100 hover:ring-1 active:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {children}
      </a>
    </Link>
  </li>
));

export default SlideOverMenuItem;

SlideOverMenuItem.propTypes = {
  children: PropTypes.node,
};
