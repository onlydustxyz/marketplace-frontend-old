import { useMemo } from "react";
import config from "src/config";
import { useQuery } from "./react-router";

export function useNewUI() {
  const query = useQuery();

  return useMemo(() => {
    return config.UI_VERSION === "v2" || query.get("ui-version") === "v2";
  }, [query]);
}
