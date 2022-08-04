import { FC } from "react";

import { ContributionTypeEnum } from "src/model/projects/repository";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterTypeAtom } from "src/state/contributions-filters";
import ListBoxFilter from "src/components/ListBoxFilter";
import { FilterProps } from ".";

type Props = {
  sourceKey: FilterProps["sourceKey"];
};

const statuses: Array<ContributionTypeEnum> = [
  ContributionTypeEnum.BUG,
  ContributionTypeEnum.BUILD,
  ContributionTypeEnum.DOCUMENTATION,
  ContributionTypeEnum.FEATURE,
  ContributionTypeEnum.PRFOMANCE,
  ContributionTypeEnum.REFACTOR,
  ContributionTypeEnum.TEST,
];

const TypeFilter: FC<Props> = ({ sourceKey }) => {
  const [selectedDifficulties, setSelectedDifficulties] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(
    contributionsFilterTypeAtom(sourceKey)
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
      label="Type"
      multiple
    />
  );
};

export default TypeFilter;
