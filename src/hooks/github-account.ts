import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import config from "src/config";
import { toBN, toHex } from "starknet/dist/utils/number";

interface ConnectGithubAccountParams {
  address: string;
  code: string;
  hash: string;
  signature: string[];
}

interface GithubEndpointData {
  authorization_code: string;
  account_address: string;
  signed_data: {
    hash: string;
    signature: {
      r: string;
      s: string;
    };
  };
}

interface GithubEndpointReturn {
  data: unknown;
}

export function useGithubAccount() {
  const [data, setData] = useState<GithubEndpointReturn>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [isSuccess, setIsSuccess] = useState(false);

  const controller = new AbortController();

  const connect = async ({ address, code, hash, signature }: ConnectGithubAccountParams) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await axios.post<GithubEndpointReturn, AxiosResponse<GithubEndpointReturn>, GithubEndpointData>(
        `${config.SIGNUP_API_HOSTNAME}/registrations/github`,
        {
          authorization_code: code,
          account_address: address,
          signed_data: {
            hash: hash,
            signature: {
              r: toHex(toBN(signature[0])),
              s: toHex(toBN(signature[1])),
            },
          },
        },
        {
          signal: controller.signal,
        }
      );

      setIsSuccess(true);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };
  // cancel the request
  return {
    connect,
    abort: () => {
      controller.abort();
    },
    isLoading,
    data,
    error,
    isSuccess,
  };
}
