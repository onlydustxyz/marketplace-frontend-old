import { forwardRef, Ref } from "react";
import cn from "classnames";

export interface ContentContainerProps {
  theme?: "primary" | "secondary";
  children?: React.ReactNode;
  className?: string;
}

const classesByTheme = {
  primary:
    "bg-space-blue bg-opacity-20 border-[4px] after:inset-[-4px] before:absolute before:bg-space-blue before:rounded-lg before:inset-0 before:z-m1",
  secondary:
    "bg-space-purple bg-opacity-20 border-[1px] after:inset-[-1px] before:absolute before:bg-black before:rounded-lg before:inset-0 before:z-m1",
} as Record<Required<ContentContainerProps>["theme"], string>;

function ContentContainer({ children, className, theme = "primary" }: ContentContainerProps, ref: Ref<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className={cn(
        className,
        classesByTheme[theme],
        "rounded-lg text-light-purple relative border-solid border-transparent bg-clip-padding after:absolute after:rounded-lg after:bg-gradient-primary after:z-m2"
      )}
    >
      {children}
    </div>
  );
}

export default forwardRef(ContentContainer);
