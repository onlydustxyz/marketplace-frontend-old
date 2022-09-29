import { ContributorDto, ContributorRepository } from "./repository";

export class InMemoryContributorRepository implements ContributorRepository {
  private contributors: ContributorDto[] = [
    {
      id: "0x26",
      github_identifier: "github-id",
      github_username: "github-username",
      account: "0x123456789",
    },
    {
      id: "0x27",
      github_identifier: "github-id",
      github_username: "github-username",
      account: "0x123456789abcdef",
    },
    {
      id: "0x28",
      github_identifier: "github-id",
      github_username: "github-username",
      account: "0x12340241B3e9559bF8786c236128525A2CC36a2c04F0115Ff902c63Df712cdef",
    },
    {
      id: "0x29",
      github_identifier: "github-id",
      github_username: "github-username",
      account: "0x0abcdefabcdef",
    },
    {
      id: "0x26",
      github_identifier: "github-id",
      github_username: "github-username",
      account: "0x012c0407D341F351E000b894c3a0d226Bc971caEd123eF1abb9388f6AA02AED0",
    },
  ];

  public async findById(id: ContributorDto["id"]): Promise<ContributorDto> {
    const contributor = this.contributors.find(
      fetchedContributor => parseInt(fetchedContributor.id, 16) === parseInt(id, 16)
    );
    if (!contributor) {
      throw new Error("Failed to fetch contributor");
    }

    return contributor;
  }

  public async findByAccountAddress(address: string): Promise<ContributorDto> {
    const contributor = this.contributors.find(
      fetchedContributor => parseInt(fetchedContributor.account, 16) === parseInt(address, 16)
    );

    if (!contributor) {
      throw new Error("Failed to fetch contributor " + address);
    }

    return contributor;
  }
}
