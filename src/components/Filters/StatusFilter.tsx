import { FC } from "react";

import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterStatusAtom, ContributionStatusEnum } from "src/state";
import ListBoxFilter from "src/components/ListBoxFilter";
import { FilterProps } from ".";

type Props = {
  sourceKey: FilterProps["sourceKey"];
};

const statuses: Array<ContributionStatusEnum> = [
  ContributionStatusEnum.OPEN,
  ContributionStatusEnum.GATED,
  ContributionStatusEnum.ASSIGNED,
  ContributionStatusEnum.COMPLETED,
];

const StatusFilter: FC<Props> = ({ sourceKey }) => {
  const [selectedStatuses, setSelectedStatuses] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(
    contributionsFilterStatusAtom(sourceKey)
  );

  const values = statuses.map(status => ({
    id: status,
    label: status,
    data: status,
  }));

  const selectedValues = values.filter(value => selectedStatuses.includes(value.id));

  const setSelectedValues = (newValues: typeof values) => {
    setSelectedStatuses(newValues.map(newValue => newValue.id));
  };

  return (
    <ListBoxFilter
      values={values}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      label="Status"
      multiple
    />
  );
};

export default StatusFilter;
