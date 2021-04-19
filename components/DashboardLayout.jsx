import React from "react";
import PropTypes from "prop-types";

const DashboardLayout = ({ children }) => (
  <>
    <nav>
      <ul className="grid grid-flow-col gap-4">
        <li>WoW AH</li>
        <li>Sniper</li>
        <li>Fin Calc</li>
      </ul>
    </nav>
    {children}
  </>
);

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
