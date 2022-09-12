import { FC } from "react";
import cn from "classnames";
import ContributionList from "src/components/ContributionList";
import FilterIcon from "src/icons/Filter";
import Filters from "src/components/Filters";
import { Contribution } from "src/state";

type Props = {
  contributions: Contribution[];
  toggleFilters: () => void;
  displayFilters: boolean;
};

const ContributionsPage: FC<Props> = ({ contributions, displayFilters, toggleFilters }) => {
  return (
    <div className="w-full max-w-screen-2xl px-2 md:px-8">
      <div className="relative flex flex-row mt-8 mb-4">
        <h1 className="flex-grow text-3xl font-alfreda leading-[63px]">All contributions</h1>

        <div
          className={cn(
            "w-[63px] h-[63px] flex items-center justify-center cursor-pointer transition-all duration-300",
            displayFilters ? "bg-white" : "bg-black"
          )}
          onClick={toggleFilters}
        >
          <FilterIcon
            size={24}
            className={cn("transition-all duration-300", displayFilters ? "fill-black" : "fill-white")}
          />
        </div>
      </div>

      <Filters className={cn("mt-5", !displayFilters && "hidden")} sourceKey="contributions" />

      <ContributionList className="mt-12" contributions={contributions} />
    </div>
  );
};

export default ContributionsPage;
