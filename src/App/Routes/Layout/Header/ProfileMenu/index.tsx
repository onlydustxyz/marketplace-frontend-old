import { FC, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accountAddressSelector, displayRegisterModalAtom } from "src/state";
import ProfileMenu from "./View";

const ProfileMenuContainer: FC = () => {
  const accountAddress = useRecoilValue(accountAddressSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);

  const onFinalizeRegistration = useCallback(() => {
    setDisplayRegisterModal(true);
  }, [setDisplayRegisterModal]);

  return <ProfileMenu accountAddress={accountAddress} onClickFinalizeRegistration={onFinalizeRegistration} />;
};

export default ProfileMenuContainer;
