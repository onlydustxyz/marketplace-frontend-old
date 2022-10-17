import { FC } from "react";

import Header from "./Header";
import HeaderV2 from "./HeaderV2";
import { useNewUI } from "src/utils/version";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributorAccountSelector } from "src/state";

const HeaderContainer: FC = () => {
  const newUI = useNewUI();

  const accountAddress = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributorAccountSelector);

  if (newUI) {
    return <HeaderV2 accountAddress={accountAddress} />;
  }
  return <Header />;
};

export default HeaderContainer;
