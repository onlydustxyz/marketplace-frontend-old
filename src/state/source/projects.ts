import { selector, selectorFamily } from "recoil";

import { ProjectDto, projectRepository } from "src/model/projects/repository";

export const rawProjectsQuery = selector<ProjectDto[]>({
  key: "RawProjectsQuery",
  get: async () => {
    const projects = await projectRepository.list();

    return projects;
  },
});

export const rawProjectQuery = selectorFamily<ProjectDto | undefined, ProjectDto["id"]>({
  key: "RawProjectQuery",
  get:
    projectId =>
    ({ get }) => {
      const projects = get(rawProjectsQuery);

      return projects.find(project => project.id === projectId);
    },
});
