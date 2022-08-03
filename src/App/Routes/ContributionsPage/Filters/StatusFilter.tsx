import { FC } from "react";

import { ContributionStatusEnum } from "src/model/projects/repository";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterStatusAtom } from "src/state/contributions-filters";
import ListBoxFilter from "src/components/ListBoxFilter";

const statuses: Array<ContributionStatusEnum | "gated"> = [
  ContributionStatusEnum.OPEN,
  "gated",
  ContributionStatusEnum.ASSIGNED,
  ContributionStatusEnum.COMPLETED,
];

const StatusFilter: FC = () => {
  const [selectedStatuses, setSelectedStatuses] =
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE(contributionsFilterStatusAtom);

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
