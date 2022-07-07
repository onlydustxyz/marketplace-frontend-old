import { FC, Suspense } from "react";

import ContentContainer from "src/components/ContentContainer";

import GithubSignin from "./GithubSignin";
import ContributionList from "./ContributionList";

type Props = {
  accountAddress?: string;
  isGithubRegistered?: boolean;
};

const HomePage: FC<Props> = ({ accountAddress, isGithubRegistered }) => {
  if (!accountAddress) {
    return (
      <div className="text-4xl text-center pt-24 text-red-800 mt-12">
        To be able to create your NFT profile, you have to connect your wallet.
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
