import cn from "classnames";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, createElement, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonExtends = ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps extends ButtonExtends {
  theme?: "primary" | "secondary";
  children: ReactNode;
  size?: "small" | "medium" | "regular";
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
}

const classesBySize = {
  small: "h-[32px] w-[120px] text-[14px]",
  medium: "h-[48px] w-[180px] text-[18px]",
  regular: "h-[65px] w-[243.75px] text-[20px]",
} as Record<Required<ButtonProps>["size"], string>;

const classesByTheme = {
  primary:
    "text-[#23113f] bg-button-primary text-shadow-button-primary shadow-button-primary hover:[&:not(:disabled)]:bg-button-primary-hover disabled:opacity-20 disabled:shadow-none",
  secondary:
    "h-[48px] w-[180px] text-[18px] text-light-blue bg-space-blue bg-none hover:bg-button-secondary-hover hover:text-light-purple disabled:text-mid-blue disabled:bg-none ",
} as Record<Required<ButtonProps>["theme"], string>;

export default function Button({
  href,
  target,
  children,
  size = "regular",
  theme = "primary",
  className,
  ...buttonProps
}: ButtonProps) {
  const props = {
    className: cn(
      className,
      classesBySize[size] ?? null,
      classesByTheme[theme] ?? null,
      "relative flex items-center justify-center cursor-pointer font-bold uppercase text-base outline-none focus:outline-none border-none bg-no-repeat bg-cover"
    ),
    ...buttonProps,
  };

  if (href) {
    if (target) {
      return createElement("a", { ...props, href, target }, children);
    }

    return createElement(Link, { ...props, to: href }, children);
  }

  return createElement("button", { ...props, type: "button" }, children);
}
