import { useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributorRepository } from "src/model/contributors/repository";
import { contributorAccountSelector } from "src/state";
import { rawContributorQuery } from "src/state/source/contributor";

const useContactInformation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const refreshContributor = useRecoilRefresher_UNSTABLE(rawContributorQuery);
  const contributorAccount = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributorAccountSelector);

  const register = async (discordHandle: string) => {
    if (contributorAccount === undefined) {
      console.warn("Contributor account address not defined but trying to register Discord");
      return;
    }
    setLoading(true);
    setError(undefined);
    try {
      await contributorRepository.registerDiscordHandle({
        contributorAccount,
        discordHandle,
      });
      refreshContributor();
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    register,
  };
};

export default useContactInformation;
