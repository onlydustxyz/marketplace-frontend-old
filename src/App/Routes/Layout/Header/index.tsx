import { FC, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { accountAddressSelector, displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";

import Header from "./View";

const HeaderContainer: FC = () => {
  const accountAddress = useRecoilValue(accountAddressSelector);
  const isGithubRegistered = useRecoilValue(isGithubRegisteredSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);

  const onFinalizeRegistration = useCallback(() => {
    setDisplayRegisterModal(true);
  }, [setDisplayRegisterModal]);

  return (
    <Header
      onClickFinalizeRegistration={onFinalizeRegistration}
      accountAddress={accountAddress}
      isRegistered={isGithubRegistered}
    />
  );
};

export default HeaderContainer;
