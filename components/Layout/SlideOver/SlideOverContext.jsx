import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const slideOverInitialState = {
  isOpen: false,
};

const SlideOverContext = createContext();

const slideOverReducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, isOpen: true };
    case "close":
      return { ...state, isOpen: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const SlideOverProvider = ({ children }) => {
  const [slideOverState, slideOverDispatch] = useReducer(
    slideOverReducer,
    slideOverInitialState
  );

  return (
    <SlideOverContext.Provider value={{ slideOverState, slideOverDispatch }}>
      {children}
    </SlideOverContext.Provider>
  );
};

SlideOverProvider.propTypes = {
  children: PropTypes.node,
};

const useSlideOver = () => {
  const context = useContext(SlideOverContext);
  if (context === undefined)
    throw new Error("useSlideOver must be used within a SlideOverProvider");
  return context;
};

export { SlideOverProvider, useSlideOver };
