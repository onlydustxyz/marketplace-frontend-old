import { FC } from "react";
import { useRecoilValue } from "recoil";

import HomePage from "src/App/Routes/HomePage/View";
import { accountAddressSelector, isGithubRegisteredSelector } from "src/state";

const HomePageContainer: FC = () => {
  const accountAddress = useRecoilValue(accountAddressSelector);
  const isGithubRegistered = useRecoilValue(isGithubRegisteredSelector);

  return <HomePage accountAddress={accountAddress} isGithubRegistered={isGithubRegistered} />;
};

export default HomePageContainer;
