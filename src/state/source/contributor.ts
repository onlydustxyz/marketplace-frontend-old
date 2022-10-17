import { selector } from "recoil";
import { contributorRepository } from "src/model/contributors/repository";
import { contributorAccountSelector } from "../starknet";

export const rawContributorQuery = selector({
  key: "ContributorSelector",
  get: async ({ get }) => {
    const accountAddress = get(contributorAccountSelector);

    if (!accountAddress) {
      return undefined;
    }

    try {
      return await contributorRepository.findByAccountAddress(accountAddress);
    } catch (error) {
      console.warn(error);
    }

    return undefined;
  },
});
