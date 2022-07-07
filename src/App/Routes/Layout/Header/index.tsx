import { FC } from "react";
import { useRecoilValue } from "recoil";

import { accountAddressAtom } from "src/state";

import Header from "./View";

const HeaderContainer: FC = () => {
  const accountAddress = useRecoilValue(accountAddressAtom);

  return <Header accountAddress={accountAddress} />;
};

export default HeaderContainer;
