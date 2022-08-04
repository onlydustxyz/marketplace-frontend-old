import { FC } from "react";

import { ContributionDifficultyEnum } from "src/model/projects/repository";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterDifficultyAtom } from "src/state/contributions-filters";
import ListBoxFilter from "src/components/ListBoxFilter";

const statuses: Array<ContributionDifficultyEnum> = [
  ContributionDifficultyEnum.EASY,
  ContributionDifficultyEnum.INTERMEDIATE,
  ContributionDifficultyEnum.HARD,
];

const DifficultyFilter: FC = () => {
  const [selectedDifficulties, setSelectedDifficulties] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(
    contributionsFilterDifficultyAtom("contributions")
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
      label="Difficulty"
      multiple
    />
  );
};

export default DifficultyFilter;