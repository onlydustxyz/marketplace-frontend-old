import { FC } from "react";

import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterProjectAtom } from "src/state";
import ListBoxFilter from "src/components/ListBoxFilter";
import { projectFilter } from "src/state";
import { FilterProps } from ".";

type Props = {
  sourceKey: FilterProps["sourceKey"];
};

const ProjectFilter: FC<Props> = ({ sourceKey }) => {
  const projects = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(projectFilter);
  const [selectedDifficulties, setSelectedDifficulties] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(
    contributionsFilterProjectAtom(sourceKey)
  );

  const values = projects
    .map(project => ({
      id: project.id,
      label: project.title,
      data: project,
    }))
    .sort((project1, project2) => {
      return project1.label < project2.label ? -1 : 1;
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
      label="Project"
      multiple
    />
  );
};

export default ProjectFilter;
