import { FC, PropsWithChildren, ReactElement, useEffect } from "react";
import { Abi } from "starknet";
import { useConnectors, useContract, useStarknet } from "@starknet-react/core";

import config from "src/config";
import profileRegistryAbi from "src/abis/profileRegistry.json";
import { useSetRecoilState } from "recoil";
import { accountAtom, profileRegistryContractAtom } from "src/state";

const StarknetSyncState: FC<PropsWithChildren> = ({ children }) => {
  const setAccount = useSetRecoilState(accountAtom);
  const setProfileRegistryContract = useSetRecoilState(profileRegistryContractAtom);

  const { account: accountAddress } = useStarknet();

  const { contract: profileRegistryContract } = useContract({
    abi: profileRegistryAbi as Abi,
    address: config.REGISTRY_CONTRACT_ADDRESS,
  });

  const { connectors } = useConnectors();

  useEffect(() => {
    setProfileRegistryContract(profileRegistryContract);
  }, [profileRegistryContract]);

  useEffect(() => {
    (async () => {
      for (const connector of connectors) {
        const account = await connector.account();
        if (account?.address === accountAddress) {
          setAccount(account);
          return;
        }
      }
      setAccount(undefined);
    })();
  }, [accountAddress, connectors]);

  return children as ReactElement;
};

export default StarknetSyncState;
