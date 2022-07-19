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
  small: "h-[31px] min-w-[157px] text-[13px] px-3",
  medium: "h-[48px] min-w-[200px] text-base px-5",
  regular: "h-[65px] min-w-[244px] text-lg px-7",
} as Record<Required<ButtonProps>["size"], string>;

const classesByTheme = {
  primary: "bg-button-primary tracking-[0.08em]",
  secondary: "bg-button-secondary tracking-[0.1em]",
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
      classesBySize[size] ?? null,
      classesByTheme[theme] ?? null,
      "relative flex items-center justify-center cursor-pointer font-bold uppercase outline-none focus:outline-none border-none bg-no-repeat bg-cover hover:opacity-70 disabled:opacity-40 disabled:cursor-default",
      className
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
