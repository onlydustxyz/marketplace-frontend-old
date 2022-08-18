import { selector } from "recoil";
import { contactInformationRepository } from "src/model/contact-information/repository";
import { userContributorIdSelector } from "src/state/profile-registry-contract";

export const userDiscordHandleSelector = selector<string | undefined>({
  key: "userDiscordHandle",
  get: async ({ get }) => {
    const userContributorId = get(userContributorIdSelector);
    if (userContributorId === undefined) {
      return undefined;
    }
    try {
      const contactInformation = await contactInformationRepository.findByContributorId(userContributorId);
      return contactInformation.discord_handle;
    } catch (error) {
      console.warn(error);
    }
  },
});
