import { useStarknet } from "@starknet-react/core";

import Header from "src/components/Header";
import GithubSignin from "src/components/GithubSignin";
import ContentContainer from "src/components/ContentContainer";

import Loader from "src/icons/Loader";
import useUserInformation from "src/hooks/user-information";

export default function HomePage() {
  const { account } = useStarknet();

  const { loading: badgeLoading, isGithubRegistered } = useUserInformation(account);

  return (
    <div className="max-w-screen-lg w-full mx-auto">
      <Header />
      <div className="flex flex-col items-center">{renderContent()}</div>
    </div>
  );

  function renderContent() {
    if (!account) {
      return (
        <div className="text-4xl text-center pt-24 text-red-800 mt-12">
          To be able to create your NFT profile, you have to connect your wallet.
        </div>
      );
    }

    if (badgeLoading) {
      return (
        <div className="flex flex-row justify-center items-center text-4xl text-center text-blue-500 mt-12">
          <Loader className="animate-spin mr-4" size={24} />
          <div>Your transaction is being processed</div>
        </div>
      );
    }

    if (isGithubRegistered) {
      return (
        <div className="text-4xl text-center pt-24 text-green-800 mt-12">
          You already registered your Github account
        </div>
      );
    }

    return (
      <>
        <ContentContainer theme="secondary" className="px-6 py-3 mb-8 text-lg">
          <p className="mb-4">
            To create your profile, we need you to connect your Github account.
            <br />
            This will allow us to check your contributions and fill in your profile.
          </p>
          <p className="mb-4">
            After the Github connection, we will ask you to sign a message to ensure you are the legitimate owner of the
            current wallet.
          </p>
          <p>Once it's done, we will call our backend to verify the information and mint your NFT.</p>
        </ContentContainer>
        <GithubSignin className="mt-8" />
      </>
    );
  }
}
