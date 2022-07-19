import { FC, useCallback } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import { accountAddressSelector, displayRegisterModalAtom } from "src/state";
import ProfileMenu from "./View";

const ProfileMenuContainer: FC = () => {
  const accountAddress = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAddressSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);

  const onFinalizeRegistration = useCallback(() => {
    setDisplayRegisterModal(true);
  }, [setDisplayRegisterModal]);

  return <ProfileMenu accountAddress={accountAddress} onClickFinalizeRegistration={onFinalizeRegistration} />;
};

export default ProfileMenuContainer;
