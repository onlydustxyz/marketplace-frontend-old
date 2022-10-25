import { selectorFamily } from "recoil";
import { enrichedProjectListSelector } from "./projects-list";

export const projectQuery = selectorFamily({
  key: "Project",
  get:
    id =>
    ({ get }) => {
      const projects = get(enrichedProjectListSelector);
      return projects.find(project => project.id === id);
    },
});
