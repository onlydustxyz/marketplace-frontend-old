import { FC } from "react";
import { useRecoilValue } from "recoil";

import HomePage from "src/App/Routes/HomePage/View";
import { accountAddressAtom, isGithubRegisteredSelector } from "src/state";

const HomePageContainer: FC = () => {
  const accountAddress = useRecoilValue(accountAddressAtom);
  const isGithubRegistered = useRecoilValue(isGithubRegisteredSelector);

  return <HomePage accountAddress={accountAddress} isGithubRegistered={isGithubRegistered} />;
};

export default HomePageContainer;
