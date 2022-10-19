import axios, { AxiosResponse } from "axios";
import { toBN, toHex } from "starknet/utils/number";

import config from "src/config";

import { ContributorDto, ContributorRepository, RegisterGithubAccount } from "./repository";
import { ContributorAccountAddress } from "../contact-information/repository";

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
export class FetchedContributorRepository implements ContributorRepository {
  public async findByAccountAddress(contributorAccountAddress: ContributorAccountAddress): Promise<ContributorDto> {
    const response = await axios.get<ContributorDto>(
      `${config.DATA_API_HOSTNAME}/contributors/${contributorAccountAddress}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch contributor");
    }

    return response.data;
  }

  public async registerGithubAccount({ address, code, hash, signature }: RegisterGithubAccount): Promise<void> {
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

    const response = await axios.put<
      {
        transaction_hash: string;
      },
      AxiosResponse<never>,
      GithubEndpointData
    >(`${config.SIGNUP_API_HOSTNAME}/contributors/${address}/github`, params);

    if (response.status !== 204) {
      throw new Error("Can't register a new contributor");
    }
  }
}
