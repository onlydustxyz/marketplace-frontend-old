import { useState } from "react";
import { useRecoilState, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contactInformationRepository } from "src/model/contact-information/repository";
import { userContributorIdSelector, userDiscordHandleSelector } from "src/state";

const useContactInformation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [, setUserDiscordHandle] = useRecoilState(userDiscordHandleSelector);
  const contributorId = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userContributorIdSelector);

  const register = async (discordHandle: string) => {
    if (contributorId === undefined) {
      console.warn("Contributor ID not defined but trying to register Discord");
      return;
    }
    setLoading(true);
    setError(undefined);
    try {
      await contactInformationRepository.save({
        contributor_id: contributorId,
        discord_handle: discordHandle,
      });
      setUserDiscordHandle(discordHandle);
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
