import { startTransition, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE } from "recoil";

import config from "src/config";
import { rawContributionsQuery } from "src/state/source/contributions";

const useRefreshContributions = function () {
  const refreshContributions = useRecoilRefresher_UNSTABLE(rawContributionsQuery);
  const location = useLocation();
  const refreshCount = useRef(0);

  useEffect(() => {
    refreshCount.current = 0;
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (refreshCount.current <= config.REFRESH_CONTRIBUTIONS_MAX_TRIES) {
        startTransition(() => {
          refreshContributions();
          refreshCount.current++;
        });
      }
    }, config.REFRESH_CONTRIBUTIONS_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { refreshContributions };
};

export default useRefreshContributions;
