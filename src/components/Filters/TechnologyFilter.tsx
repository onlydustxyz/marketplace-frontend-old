import { FC } from "react";

import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterTechnologyAtom } from "src/state";
import ListBoxFilter from "src/components/ListBoxFilter";
import { technologiesQuery } from "src/state";
import { FilterProps } from ".";

type Props = {
  sourceKey: FilterProps["sourceKey"];
};

const TechnologyFilter: FC<Props> = ({ sourceKey }) => {
  const technologies = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(technologiesQuery);
  const [selectedDifficulties, setSelectedDifficulties] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(
    contributionsFilterTechnologyAtom(sourceKey)
  );

  const values = technologies
    .map(technology => ({
      id: technology,
      label: technology,
      data: technology,
    }))
    .sort((technology1, technology2) => {
      return technology1.label < technology2.label ? -1 : 1;
    });

  const selectedValues = values.filter(value => selectedDifficulties.includes(value.id));

  const setSelectedValues = (newValues: typeof values) => {
    setSelectedDifficulties(newValues.map(newValue => newValue.id));
  };

  return (
    <ListBoxFilter
      values={values}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      label="Technology"
      multiple
    />
  );
};

export default TechnologyFilter;
