import { selector } from "recoil";
import { rawContributorQuery } from "./source/contributor";

export const userGithubHandleSelector = selector<string | undefined>({
  key: "UserGithubHandle",
  get: ({ get }) => {
    const userInformation = get(rawContributorQuery);

    return userInformation?.github_identifier && userInformation?.github_identifier !== "0"
      ? userInformation?.github_identifier
      : undefined;
  },
});

export const userDiscordHandleSelector = selector<string | undefined>({
  key: "UserDiscordHandle",
  get: ({ get }) => {
    const userInformation = get(rawContributorQuery);

    return userInformation?.discord_handle || undefined;
  },
});

export const isGithubRegisteredSelector = selector<boolean>({
  key: "IsGithubRegistered",
  get: ({ get }) => {
    const userInformation = get(rawContributorQuery);

    return !!userInformation?.github_identifier && userInformation?.github_identifier !== "0";
  },
});
