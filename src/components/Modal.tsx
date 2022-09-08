import { FC, Fragment, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cn from "classnames";

import CrossIcon from "src/icons/Cross";

export interface Props {
  contentClassName?: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  disableClose?: boolean;
}

const Modal: FC<PropsWithChildren<Props>> = ({
  contentClassName,
  disableClose = false,
  title,
  isOpen,
  onClose,
  children,
}) => {
  const closeAction = disableClose
    ? () => {
        return;
      }
    : onClose;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed h-screen w-screen inset-0 z-50 overflow-y-auto" onClose={closeAction}>
        <div className="fixed h-screen w-screen md:min-h-screen text-center flex flex-col items-center justify-center ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={cn(
                "relative w-full md:w-auto h-full md:h-auto md:max-w-screen-lg bg-space-blue bg-opacity-20 border-[2px] after:inset-[-2px] before:absolute before:bg-space-blue before:inset-0 before:z-m1 text-light-purple border-solid border-transparent bg-clip-padding after:absolute after:bg-gradient-modal after:z-m2",
                contentClassName
              )}
            >
              <div>
                {!!title && (
                  <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-light-blue mb-8">
                    {title}
                  </Dialog.Title>
                )}
                {!disableClose && (
                  <div className="absolute top-4 right-3 cursor-pointer font-sans" onClick={closeAction}>
                    <CrossIcon className="fill-white" size={18} />
                  </div>
                )}
              </div>
              <div className="text-lg">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
