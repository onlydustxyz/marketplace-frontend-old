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
  account_address?: string;
  signed_data: {
    hash: string;
    signature: {
      r: string;
      s: string;
    };
  };
}

interface GithubEndpointReturn {
  transaction_hash: string;
}

export function useGithubAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [isSuccess, setIsSuccess] = useState(false);

  const controller = new AbortController();

  const connect = async ({ address, code, hash, signature }: ConnectGithubAccountParams) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const params: GithubEndpointData = {
        authorization_code: code,
        signed_data: {
          hash: hash,
          signature: {
            r: toHex(toBN(signature[0])),
            s: toHex(toBN(signature[1])),
          },
        },
      };

      if (!config.NEW_SIGNUP_API) {
        params.account_address = address;

        const response = await axios.post<
          GithubEndpointReturn,
          AxiosResponse<GithubEndpointReturn>,
          GithubEndpointData
        >(`${config.SIGNUP_API_HOSTNAME}/registrations/github`, params, {
          signal: controller.signal,
        });

        setIsSuccess(true);
        setIsLoading(false);

        return response.data.transaction_hash;
      }

      const response = await axios.put<GithubEndpointReturn, AxiosResponse<never>, GithubEndpointData>(
        `${config.SIGNUP_API_HOSTNAME}/contributors/${address}/github`,
        params,
        {
          signal: controller.signal,
        }
      );

      if (response.status === 204) {
        setIsSuccess(true);
        setIsLoading(false);
      }

      return null;
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);

      return null;
    }
  };

  return {
    connect,
    abort: () => {
      controller.abort();
    },
    isLoading,
    error,
    isSuccess,
  };
}
