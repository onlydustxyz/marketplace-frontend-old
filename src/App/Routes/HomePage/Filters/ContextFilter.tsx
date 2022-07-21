import { FC } from "react";

import { ContributionContextEnum } from "src/model/contributions/repository";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterContextAtom } from "src/state/contributions-filters";
import ListBoxFilter from "src/components/ListBoxFilter";

const statuses: Array<ContributionContextEnum> = [
  ContributionContextEnum.ISOLATED,
  ContributionContextEnum.COUPLED,
  ContributionContextEnum.INTRICATED,
];

const ContextFilter: FC = () => {
  const [selectedDifficulties, setSelectedDifficulties] =
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE(contributionsFilterContextAtom);

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
      label="Context"
      multiple
    />
  );
};

export default ContextFilter;
