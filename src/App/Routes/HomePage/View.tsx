import GithubSignin from "./GithubSignin";
import ContentContainer from "src/components/ContentContainer";

import Loader from "src/icons/Loader";
import { FC, Suspense } from "react";
import ContributionList from "./ContributionList";

type Props = {
  account?: string;
  profileLoading: boolean;
  isGithubRegistered?: boolean;
};

const HomePage: FC<Props> = ({ account, profileLoading, isGithubRegistered }) => {
  if (!account) {
    return (
      <div className="text-4xl text-center pt-24 text-red-800 mt-12">
        To be able to create your NFT profile, you have to connect your wallet.
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="flex flex-row justify-center items-center text-4xl text-center text-blue-500 mt-12">
        <Loader className="animate-spin mr-4" size={24} />
        <div>Your transaction is being processed</div>
      </div>
    );
  }

  if (isGithubRegistered) {
    return (
      <div className="text-4xl text-center pt-24 text-green-800 mt-12">You already registered your Github account</div>
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
      <Suspense fallback={"Loading contributions..."}>
        <ContributionList />
      </Suspense>
    </>
  );
};

export default HomePage;
