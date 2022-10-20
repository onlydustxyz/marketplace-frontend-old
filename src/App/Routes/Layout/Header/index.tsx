import { FC } from "react";

import Header from "./Header";
import HeaderV2 from "./HeaderV2";
import { useNewUI } from "src/utils/version";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributorAccountAddressSelector } from "src/state";

const HeaderContainer: FC = () => {
  const newUI = useNewUI();

  const accountAddress = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributorAccountAddressSelector);

  if (newUI) {
    return <HeaderV2 accountAddress={accountAddress} />;
  }
  return <Header />;
};

export default HeaderContainer;
