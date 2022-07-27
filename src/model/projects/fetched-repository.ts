import config from "src/config";

import { ProjectRepository, ProjectDto } from "./repository";

export class FetchedProjectRepository implements ProjectRepository {
  public async list(): Promise<ProjectDto[]> {
    try {
      const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/projects`);

      const response = await fetch(endpointUrl.toString());

      const projectsWithContributions: ProjectDto[] = await response.json();

      return projectsWithContributions;
    } catch (error) {
      return [];
    }
  }
}
