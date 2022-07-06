import { useStarknet } from "@starknet-react/core";
import { FC } from "react";
import Header from "./View";

const HeaderContainer: FC = () => {
  const { account } = useStarknet();

  return <Header account={account} />;
};

export default HeaderContainer;
