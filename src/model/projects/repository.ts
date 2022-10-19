import { InMemoryProjectRepository } from "./in-memory-repository";
import { FetchedProjectRepository } from "./fetched-repository";

export type ProjectDto = {
  id: string;
  title: string;
  description: string;
  github_link: string;
  discord_link?: string;
  website_link?: string;
  logo?: string;
  members: string[];
};

export type ProjectMember = {
  contributor_account_address: string;
  is_lead_contributor: boolean;
};
export interface ProjectRepository {
  list(): Promise<ProjectDto[]>;
}

export const projectRepository: ProjectRepository =
  process.env.NODE_ENV === "test" ? new InMemoryProjectRepository() : new FetchedProjectRepository();
