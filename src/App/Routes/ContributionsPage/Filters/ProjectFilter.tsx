import { FC } from "react";

import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributionsFilterProjectAtom } from "src/state/contributions-filters";
import ListBoxFilter from "src/components/ListBoxFilter";
import { projectsQuery } from "src/state";

const ProjectFilter: FC = () => {
  const projects = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(projectsQuery);
  const [selectedDifficulties, setSelectedDifficulties] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(
    contributionsFilterProjectAtom("contributions")
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
