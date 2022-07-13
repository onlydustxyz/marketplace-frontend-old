import { FC } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "./View";

type Props = {
  className?: string;
};

const BackButtonContainer: FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return <BackButton onClick={goBack} className={className} />;
};

export default BackButtonContainer;
