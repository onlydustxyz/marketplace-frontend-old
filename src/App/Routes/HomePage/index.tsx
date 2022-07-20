import { FC, useState } from "react";
import cn from "classnames";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import ContributionList from "src/components/ContributionList";
import FilterIcon from "src/icons/Filter";
import { filteredContributionsSelector } from "src/state/contributions-filters";
import Filters from "./Filters";

const HomePage: FC = () => {
  const contributions = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(filteredContributionsSelector);

  const [displayFilters, setDisplayFilters] = useState(false);

  const onToggleDisplayFilters = () => {
    setDisplayFilters(displayFilters => !displayFilters);
  };

  return (
    <div className="w-full max-w-screen-2xl px-8">
      <div className="relative flex flex-row mt-8 mb-4">
        <h1 className="flex-grow text-3xl font-alfreda leading-[63px]">All contributions</h1>

        <div
          className={cn(
            "w-[63px] h-[63px] flex items-center justify-center cursor-pointer transition-all duration-300",
            displayFilters ? "bg-white" : "bg-black"
          )}
          onClick={onToggleDisplayFilters}
        >
          <FilterIcon
            size={24}
            className={cn("transition-all duration-300", displayFilters ? "fill-black" : "fill-white")}
          />
        </div>
      </div>

      <Filters className={cn("mt-5", !displayFilters && "hidden")} />

      <ContributionList className="mt-12" contributions={contributions} />
    </div>
  );
};

export default HomePage;
