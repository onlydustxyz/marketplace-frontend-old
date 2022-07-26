import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop: FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return null;
};

export default ScrollTop;
