import React, { useRef } from "react";
import SlideOver from "./SlideOver";
import SlideOverMenu from "./SlideOverMenu";
import { SlideOverProvider } from "./SlideOverContext";

const SlideOverIndex = () => {
  const menuItemRef = useRef();
  const ulRef = useRef();

  React.useEffect(() => {
    // console.log(2, menuItemRef);
  }, [menuItemRef]);

  React.useEffect(() => {
    // console.log(4, ulRef);
  }, [ulRef]);

  return (
    <SlideOverProvider>
      <SlideOver ref={ulRef}>
        <SlideOverMenu ref={ulRef} />
      </SlideOver>
    </SlideOverProvider>
  );
};

export default SlideOverIndex;
