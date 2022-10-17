import { useStarknet } from "@starknet-react/core";
import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { Navigate } from "react-router-dom";

import useRefreshContributions from "src/hooks/refresh-contributions";
import { myContributionsState } from "src/state";

import MyContributionsPage from "./View";

const MyContributionsPageContainer: FC = () => {
  const contributions = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(myContributionsState);
  const { account: accountAddress } = useStarknet();

  useRefreshContributions();

  if (!accountAddress) {
    return <Navigate to="/" />;
  }

  return <MyContributionsPage contributions={contributions} />;
};

export default MyContributionsPageContainer;
