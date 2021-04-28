import React, { forwardRef, Fragment } from "react";
import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import SlideOverMenuItem from "./SlideOverMenuItem";

const SlideOverMenu = forwardRef(
  ({ navMenu = ["WoW AH", "Sniper", "Fin Calc"] }, ref) => {
    const handleDuration = (i) => {
      const durations = ["duration-700", "duration-1000", "duration-1200"];
      return durations[i];
    };

    return (
      <ul className="ml-4" ref={ref}>
        {navMenu.map((navName, i) => (
          <Transition.Child
            as={Fragment}
            key={navName}
            enter={`transform transition ease-in-out ${handleDuration(i)}`}
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <SlideOverMenuItem>{navName}</SlideOverMenuItem>
          </Transition.Child>
        ))}
      </ul>
    );
  }
);

export default SlideOverMenu;

SlideOverMenu.propTypes = {
  navMenu: PropTypes.shape([]),
};
