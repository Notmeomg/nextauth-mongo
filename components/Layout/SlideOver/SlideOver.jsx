import React, { Fragment, forwardRef } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, MenuIcon } from "@heroicons/react/outline";
import { useSwipeable } from "react-swipeable";
import { useSlideOver } from "./SlideOverContext";

const SlideOver = forwardRef(
  (
    {
      children,
      dialogTitle = "Zachariahkeener.com",
      dialogDescription = "Navigation",
    },
    ref
  ) => {
    const {
      slideOverState: { isOpen },
      slideOverDispatch,
    } = useSlideOver();

    const handlers = useSwipeable({
      onSwipedLeft: () => slideOverDispatch({ type: "close" }),
      onSwipedRight: () => slideOverDispatch({ type: "true" }),
      trackMouse: true,
    });
    return (
      <>
        <button
          type="button"
          className="m-4 p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => slideOverDispatch({ type: "open" })}
          ref={ref}
        >
          <span className="sr-only">Open panel</span>
          <MenuIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-hidden"
            static
            initialFocus={ref}
            open={isOpen}
            onClose={() => slideOverDispatch({ type: "close" })}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-30 transition-opacity" />
              </Transition.Child>
              <div className="fixed inset-y-0 left-0 right-1/4 max-w-sm flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="bg-white w-full">
                    <div className="h-full" {...handlers}>
                      <div className="grid grid-cols-1-max gap-4 px-6 py-4 border-b mb-4">
                        <Transition.Child
                          as={Fragment}
                          enter="transform transition ease-in-out duration-700"
                          enterFrom="-translate-x-full"
                          enterTo="translate-x-0"
                          leave="transform transition ease-in-out duration-500"
                          leaveFrom="translate-x-0"
                          leaveTo="-translate-x-full"
                        >
                          <div>
                            <Dialog.Title className="text-black opacity-50">
                              {dialogTitle}
                            </Dialog.Title>
                          </div>
                        </Transition.Child>
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-end"
                          onClick={() => slideOverDispatch({ type: "close" })}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="px-6 py-4">
                        <Dialog.Description className="text-black opacity-50 border-b pb-1 mb-2">
                          {dialogDescription}
                        </Dialog.Description>
                        {children}
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
  }
);

export default SlideOver;

SlideOver.propTypes = {
  children: PropTypes.node,
  slideOpen: PropTypes.bool,
  dialogTitle: PropTypes.string,
  dialogDescription: PropTypes.string,
};
