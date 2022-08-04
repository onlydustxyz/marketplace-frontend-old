import { FC } from "react";

import { ContributionDurationEnum } from "src/model/projects/repository";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterDurationAtom } from "src/state/contributions-filters";
import ListBoxFilter from "src/components/ListBoxFilter";
import { FilterProps } from ".";

type Props = {
  sourceKey: FilterProps["sourceKey"];
};

const statuses: Array<ContributionDurationEnum> = [
  ContributionDurationEnum.UNDER_A_DAY,
  ContributionDurationEnum.FEW_DAYS,
  ContributionDurationEnum.WEEKS,
];

const DurationFilter: FC<Props> = ({ sourceKey }) => {
  const [selectedDifficulties, setSelectedDifficulties] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(
    contributionsFilterDurationAtom(sourceKey)
  );

  const values = statuses.map(status => ({
    id: status,
    label: status,
    data: status,
  }));

  const selectedValues = values.filter(value => selectedDifficulties.includes(value.id));

  const setSelectedValues = (newValues: typeof values) => {
    setSelectedDifficulties(newValues.map(newValue => newValue.id));
  };

  return (
    <ListBoxFilter
      values={values}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      label="Duration"
      multiple
    />
  );
};

export default DurationFilter;
