import { ProjectRepository, ProjectDto } from "./repository";

export class InMemoryProjectRepository implements ProjectRepository {
  private projects: ProjectDto[] = [
    {
      id: "1",
      title: "Project 1",
      description: "Description 1",
      github_link: "https://example.com/projects/1",
      discord_link: "https://example.com/discord/1",
      website_link: "https://example.com/website/1",
      members: ["0x0abcdefabcdef"],
      logo: "https://app.onlydust.xyz/assets/onlydust-logo.5f8cc594.png",
    },
    {
      id: "2",
      title: "Project 2",
      description: "Description 2",
      github_link: "https://example.com/projects/2",
      members: [],
    },
    {
      id: "3",
      title: "Project 3",
      description: "Description 3",
      github_link: "https://example.com/projects/3",
      members: [
        "0x123456789",
        "0x012c0407D341F351E000b894c3a0d226Bc971caEd123eF1abb9388f6AA02AED0",
        "0x123456789abcdef",
      ],
    },
    {
      id: "4",
      title: "Project 4",
      description: "Description 4",
      github_link: "https://example.com/projects/4",
      members: ["0x123456789"],
    },
    {
      id: "5",
      title: "Project 5",
      description: "Description 5",
      github_link: "https://example.com/projects/5",
      members: ["0x123456789"],
    },
  ];

  public async list(): Promise<ProjectDto[]> {
    return this.projects;
  }
}
