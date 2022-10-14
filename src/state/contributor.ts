import { selector } from "recoil";
import { ContributorId } from "src/model/contact-information/repository";
import { rawContributorQuery } from "./source/contributor";

export const userContributorIdSelector = selector<ContributorId | undefined>({
  key: "userContributorId",
  get: ({ get }) => {
    const userInformation = get(rawContributorQuery);

    return (userInformation?.id as ContributorId) || undefined;
  },
});

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
