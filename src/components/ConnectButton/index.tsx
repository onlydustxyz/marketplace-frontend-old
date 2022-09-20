import { useStarknet } from "@starknet-react/core";
import { FC, PropsWithChildren, useCallback } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import { displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";
import { ButtonProps } from "../Button";
import ConnectButton from "./View";

type Props = {
  theme?: ButtonProps["theme"];
  size?: ButtonProps["size"];
  dataTestid?: string;
};

const ConnectButtonContainer: FC<PropsWithChildren<Props>> = ({ children, size, theme, dataTestid }) => {
  const { connect } = useStarknet();

  const isGithubRegistered = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(isGithubRegisteredSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);

  const onConnect = useCallback(async () => {
    setDisplayRegisterModal(true);
  }, [connect, isGithubRegistered]);

  return (
    <ConnectButton onConnect={onConnect} size={size} theme={theme} dataTestid={dataTestid}>
      {children}
    </ConnectButton>
  );
};

export default ConnectButtonContainer;
