import { atom, selector } from "recoil";

import { contactInformationRepository } from "src/model/contact-information/repository";

import { contributorAccountSelector } from "./starknet";

export const userDiscordHandleAtom = atom<string | undefined>({
  key: "UserDiscordHandleAtom",
  default: undefined,
});

export const userDiscordHandleSelector = selector<string | undefined>({
  key: "UserDiscordHandle",
  get: async ({ get }) => {
    const userContributorAccount = get(contributorAccountSelector);
    if (userContributorAccount === undefined) {
      return undefined;
    }
    const discordHandleAtom = get(userDiscordHandleAtom);
    if (discordHandleAtom) {
      return discordHandleAtom;
    }
    try {
      const contactInformation = await contactInformationRepository.findByContributorAccountAddress(
        userContributorAccount
      );
      return contactInformation.discord_handle;
    } catch (error) {
      console.warn(error);
    }
  },
  set: ({ set }, newValue) => {
    set(userDiscordHandleAtom, newValue);
  },
});
