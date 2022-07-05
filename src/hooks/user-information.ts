import { useContract, useStarknetCall } from "@starknet-react/core";
import { useMemo } from "react";

import badgeRegistryAbi from "src/abis/badgeRegistry.json";
import config from "src/config";
import { Abi } from "starknet";

export default function useUserInformation(account: string | undefined) {
  const { contract } = useContract({ abi: badgeRegistryAbi as Abi, address: config.REGISTRY_CONTRACT_ADDRESS });
  const { data, loading } = useStarknetCall({
    contract,
    method: "get_user_information",
    args: [account],
  });

  const isGithubRegistered = useMemo(() => {
    return data && !!data[0].identifiers?.github;
  }, [data]);

  return { data, loading, isGithubRegistered };
}
