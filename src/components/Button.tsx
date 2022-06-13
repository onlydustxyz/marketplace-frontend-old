import cn from "classnames";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, createElement, ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "./Button.module.css";

type ButtonExtends = ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;
export interface ButtonProps extends ButtonExtends {
  theme?: "primary" | "secondary";
  children: ReactNode;
  size?: "small" | "medium" | "regular";
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
}

export default function Button({
  href,
  target,
  children,
  size,
  theme = "primary",
  className,
  ...buttonProps
}: ButtonProps) {
  const props = {
    className: cn(
      className,
      styles[theme] ?? null,
      styles.button,
      size && styles[size],
      "relative flex items-center justify-center cursor-pointer font-bold uppercase text-base outline-none focus:outline-none border-none"
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
