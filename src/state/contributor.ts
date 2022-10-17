import { selector } from "recoil";
import { rawContributorQuery } from "./source/contributor";

export const userGithubHandleSelector = selector<string | undefined>({
  key: "userGithubHandle",
  get: ({ get }) => {
    const userInformation = get(rawContributorQuery);

    return userInformation?.github_identifier && userInformation?.github_identifier !== "0"
      ? userInformation?.github_identifier
      : undefined;
  },
});

export const isGithubRegisteredSelector = selector<boolean>({
  key: "isGithubRegistered",
  get: ({ get }) => {
    const userInformation = get(rawContributorQuery);

    return !!userInformation?.github_identifier && userInformation?.github_identifier !== "0";
  },
});
