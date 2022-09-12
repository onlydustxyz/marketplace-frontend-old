import { FC } from "react";
import cn from "classnames";
import ContributionList from "src/components/ContributionList";
import FilterIcon from "src/icons/Filter";
import Filters from "src/components/Filters";
import { Contribution } from "src/state";

type Props = {
  contributions: Contribution[];
  toggleFilters: () => void;
  closeFilters: () => void;
  displayFilters: boolean;
};

const ContributionsPage: FC<Props> = ({ contributions, displayFilters, closeFilters, toggleFilters }) => {
  return (
    <div className="w-full max-w-screen-2xl px-2 md:px-8">
      <div className="relative flex flex-row mt-8 mb-4">
        <h1 className="flex-grow text-2xl leading-[48px] md:text-3xl md:leading-[63px] font-alfreda">
          All contributions
        </h1>

        <div
          className={cn(
            "w-[48px] h-[48px] md:w-[63px] md:h-[63px] flex items-center justify-center cursor-pointer transition-all duration-300",
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

      <Filters
        className={cn("mt-5", !displayFilters && "hidden")}
        sourceKey="contributions"
        closeFilters={closeFilters}
      />

      <ContributionList className="mt-12" contributions={contributions} />
    </div>
  );
};

export default ContributionsPage;
