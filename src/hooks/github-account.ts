import { useState } from "react";

import { contributorRepository } from "src/model/contributors/repository";

interface ConnectGithubAccountParams {
  address: string;
  code: string;
  hash: string;
  signature: [string, string];
}

export function useGithubAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [isSuccess, setIsSuccess] = useState(false);

  const connect = async ({ address, code, hash, signature }: ConnectGithubAccountParams) => {
    setIsLoading(true);
    setError(undefined);

    try {
      await contributorRepository.registerGithubAccount({ address, code, hash, signature });

      setIsSuccess(true);
      setIsLoading(false);

      return null;
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };

  return {
    connect,
    isLoading,
    error,
    isSuccess,
  };
}
