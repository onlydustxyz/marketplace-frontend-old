import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import { Toast as ToastType } from "react-hot-toast";

import CrossIcon from "src/icons/Cross";
import Loader from "src/icons/Loader";

export type ToastProps = {
  close?: () => void;
  type?: "success" | "error" | "pending" | "info" | "default";
  dataTestId: string;
} & Omit<ToastType, "type">;

const classNameByType = {
  success: "bg-[#36DA95]/10 backdrop-blur-[6px] before:min-w-[0.5rem] before:h-full before:bg-[#36DA95]/75",
  error: "bg-red-500/10 backdrop-blur-[6px] before:min-w-[0.5rem] before:h-full before:bg-red-500/75",
  pending: "bg-off-white/10 backdrop-blur-[6px] before:min-w-[0.5rem] before:h-full before:bg-off-white/75 ",
  info: "bg-space-purple/10 backdrop-blur-[6px] before:min-w-[0.5rem] before:h-full before:bg-space-purple/75",
  default: "bg-snow/10 backdrop-blur-[6px] before:min-w-[0.5rem] before:h-full before:bg-snow/75",
} as Record<Required<ToastProps>["type"], string>;

const Toast: FC<PropsWithChildren<ToastProps>> = ({
  children,
  close,
  dataTestId = "toast-container",
  type = "default",
}) => {
  return (
    <div
      className={cn(
        classNameByType[type],
        "max-w-md w-full h-[72px] flex items-center shadow-lg pointer-events-auto overflow-hidden"
      )}
      data-testid={dataTestId}
    >
      {type === "pending" && <Loader className="animate-spin ml-4" />}
      <div className="flex-grow p-4">{children}</div>
      {close && (
        <div className="cursor-pointer mr-4 p-2" onClick={close}>
          <CrossIcon className="fill-white" size={12} />
        </div>
      )}
    </div>
  );
};

export default Toast;
