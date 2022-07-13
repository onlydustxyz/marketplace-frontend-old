import { FC, Fragment, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";

import CrossIcon from "src/icons/Cross";
import ContentContainer from "src/components/ContentContainer";

export interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<Props>> = ({ title, isOpen, onClose, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto " onClose={onClose}>
        <div className="min-h-screen px-4 text-center flex flex-col items-center justify-center ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80" />
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
            <ContentContainer className="w-[86%] max-w-screen-lg px-16 pt-6 pb-8">
              <div>
                {!!title && (
                  <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-light-blue mb-8">
                    {title}
                  </Dialog.Title>
                )}
                <div className="absolute top-4 right-3 cursor-pointer font-sans" onClick={onClose}>
                  <CrossIcon className="fill-white" size={18} />
                </div>
              </div>
              <div className="text-lg">{children}</div>
            </ContentContainer>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
