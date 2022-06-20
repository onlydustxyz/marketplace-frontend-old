import { useStarknet } from "@starknet-react/core";

import Header from "src/components/Header";
import GithubSignin from "src/components/GithubSignin";
import ContentContainer from "src/components/ContentContainer";

import Loader from "src/icons/Loader";
import useGetUserInformation from "src/hooks/useGetUserInformation";

export default function HomePage() {
  const { account } = useStarknet();

  // const {
  //   data,
  //   loading: badgeLoading,
  //   isGithubRegistered,
  // } = useGetUserInformation("0x65f1506b7f974a1355aeebc1314579326c84a029cd8257a91f82384a6a0ace");
  const { data, loading: badgeLoading, isGithubRegistered } = useGetUserInformation(account);

  return (
    <div className="max-w-screen-lg w-full mx-auto">
      <Header />
      <div className="flex flex-col items-center">{renderContent()}</div>
    </div>
  );

  function renderContent() {
    if (!account) {
      return (
        <div className="text-4xl text-center pt-24 text-red-800">
          To be able to create your NFT profile, you have to connect your wallet.
        </div>
      );
    }

}
