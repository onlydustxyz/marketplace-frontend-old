import { selectorFamily } from "recoil";
import { projectsListState } from "./projects-list";

export const projectQuery = selectorFamily({
  key: "Project",
  get:
    id =>
    ({ get }) => {
      const projects = get(projectsListState);
      return projects.find(project => project.id === id);
    },
});
