import { FC } from "react";
import { useRecoilValue } from "recoil";

import { accountAddressSelector } from "src/state";

import Header from "./View";

const HeaderContainer: FC = () => {
  const accountAddress = useRecoilValue(accountAddressSelector);

  return <Header accountAddress={accountAddress} />;
};

export default HeaderContainer;
