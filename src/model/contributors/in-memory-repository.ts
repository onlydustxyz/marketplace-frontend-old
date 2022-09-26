import { ContributorDto, ContributorRepository } from "./repository";

export class InMemoryContributorRepository implements ContributorRepository {
  private contributorsById: Record<ContributorDto["id"], ContributorDto> = {
    "0x123456789": {
      id: "0x26",
      github_identifier: "github-id",
      github_username: "github-username",
      account: "0x123456789",
    },
    "0x123456789abcdef": {
      id: "0x27",
      github_identifier: "github-id",
      github_username: "github-username",
      account: "0x123456789abcdef",
    },
    "0x12340241B3e9559bF8786c236128525A2CC36a2c04F0115Ff902c63Df712cdef": {
      id: "0x28",
      github_identifier: "github-id",
      github_username: "github-username",
      account: "0x12340241B3e9559bF8786c236128525A2CC36a2c04F0115Ff902c63Df712cdef",
    },
  };

  public async findById(id: ContributorDto["id"]): Promise<ContributorDto> {
    const contributor = Object.values(this.contributorsById).find(fetchedContributor => {
      fetchedContributor.id === id;
    });
    if (!contributor) {
      throw new Error("Failed to fetch contributor");
    }

    return contributor;
  }

  public async findByAccountAddress(address: string): Promise<ContributorDto> {
    if (!this.contributorsById[address]) {
      throw new Error("Failed to fetch contributor");
    }

    return this.contributorsById[address];
  }
}
