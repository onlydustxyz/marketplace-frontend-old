import { FC } from "react";

import { ContributionContextEnum } from "src/model/contributions/repository";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterContextAtom } from "src/state";
import ListBoxFilter from "src/components/ListBoxFilter";
import { FilterProps } from ".";

type Props = {
  sourceKey: FilterProps["sourceKey"];
};

const statuses: Array<ContributionContextEnum> = [
  ContributionContextEnum.ISOLATED,
  ContributionContextEnum.COUPLED,
  ContributionContextEnum.INTRICATED,
];

const ContextFilter: FC<Props> = ({ sourceKey }) => {
  const [selectedDifficulties, setSelectedDifficulties] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(
    contributionsFilterContextAtom(sourceKey)
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
      label="Context"
      multiple
    />
  );
};

export default ContextFilter;
