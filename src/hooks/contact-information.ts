import { useState } from "react";
import { useRecoilState, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contactInformationRepository } from "src/model/contact-information/repository";
import { contributorAccountSelector, userDiscordHandleSelector } from "src/state";

const useContactInformation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [, setUserDiscordHandle] = useRecoilState(userDiscordHandleSelector);
  const contributorAccount = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributorAccountSelector);

  const register = async (discordHandle: string) => {
    if (contributorAccount === undefined) {
      console.warn("Contributor account address not defined but trying to register Discord");
      return;
    }
    setLoading(true);
    setError(undefined);
    try {
      await contactInformationRepository.save({
        contributor_account: contributorAccount,
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
