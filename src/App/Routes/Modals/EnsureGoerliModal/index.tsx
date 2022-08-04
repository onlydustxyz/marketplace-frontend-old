import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { starknetChainIdAtom } from "src/state";
import { StarknetChainId } from "starknet/dist/constants";
import RegisterModal from "./View";

const RegisterModalContainer: FC = () => {
  const starknetChainId = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(starknetChainIdAtom);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <RegisterModal
      displayModal={starknetChainId !== undefined && starknetChainId !== StarknetChainId.TESTNET}
      refreshPage={refreshPage}
    />
  );
};

export default RegisterModalContainer;
