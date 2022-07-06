import { useStarknet } from "@starknet-react/core";

import useUserInformation from "src/hooks/user-information";
import { FC } from "react";
import HomePage from "src/App/Routes/HomePage/View";

const HomePageContainer: FC = () => {
  const { account } = useStarknet();

  const { loading: profileLoading, isGithubRegistered } = useUserInformation(account);

  return <HomePage account={account} profileLoading={profileLoading} isGithubRegistered={isGithubRegistered} />;
};

export default HomePageContainer;
