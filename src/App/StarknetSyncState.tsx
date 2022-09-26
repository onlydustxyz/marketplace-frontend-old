import { FC, PropsWithChildren, ReactElement, useEffect, useTransition } from "react";
import { AccountInterface } from "starknet";
import { useConnectors, useStarknet, useStarknetBlock } from "@starknet-react/core";

import { useSetRecoilState } from "recoil";
import { accountAtom, blockNumberAtom, providerAtom, starknetChainIdAtom } from "src/state";

const StarknetSyncState: FC<PropsWithChildren> = ({ children }) => {
  const setAccount = useSetRecoilState(accountAtom);
  const setStarknetChainId = useSetRecoilState(starknetChainIdAtom);
  const setProvider = useSetRecoilState(providerAtom);
  const setBlockNumber = useSetRecoilState(blockNumberAtom);
  const { data: blockData } = useStarknetBlock();
  const [, startTransition] = useTransition();

  const { account: accountAddress, library: provider } = useStarknet();

  const { connectors } = useConnectors();

  useEffect(() => {
    if (blockData?.block_number) {
      startTransition(() => {
        setBlockNumber(blockData.block_number.toString());
      });
    }
  }, [blockData]);

  useEffect(() => {
    startTransition(() => {
      setProvider(provider);
    });
  }, [provider]);

  useEffect(() => {
    (async () => {
      for (const connector of connectors) {
        const account: AccountInterface = await connector.account();
        if (accountAddress !== undefined && account?.address === accountAddress) {
          startTransition(() => {
            setAccount(account);
            setStarknetChainId(account.chainId);
          });
          return;
        }
      }
      startTransition(() => {
        setAccount(undefined);
      });
    })();
  }, [accountAddress, connectors]);

  return children as ReactElement;
};

export default StarknetSyncState;
