import { FC, Suspense } from "react";

import ContributionList from "./ContributionList";

const HomePage: FC = () => {
  return (
    <Suspense fallback={"Loading contributions..."}>
      <ContributionList />
    </Suspense>
  );
};

export default HomePage;
