import classNames from "classnames";

export enum ContributionPropertyColor {
  Red = "Red",
  Blue = "Blue",
  Green = "Green",
  Yellow = "Yellow",
  White = "White",
  Gray = "Gray",
}

export const contributionPropertyColorMap = {
  [ContributionPropertyColor.Red]: "text-red-300",
  [ContributionPropertyColor.Blue]: "text-blue-300",
  [ContributionPropertyColor.Green]: "text-emerald-300",
  [ContributionPropertyColor.Yellow]: "text-yellow-200",
  [ContributionPropertyColor.White]: "text-white",
  [ContributionPropertyColor.Gray]: "text-gray-200",
};

export interface ContributionPropertyProps extends React.PropsWithChildren {
  text: string;
  textColor: ContributionPropertyColor;
}

export const ContributionProperty = ({ text, textColor, children }: ContributionPropertyProps) => {
  return (
    <div
      className={classNames(
        "h-7 md:h-10 bg-neutral-900 flex flex-row rounded-full items-center px-3.5 text-sm tracking-[0.66px] whitespace-nowrap w-fit",
        contributionPropertyColorMap[textColor]
      )}
    >
      {children} {text}
    </div>
  );
};
