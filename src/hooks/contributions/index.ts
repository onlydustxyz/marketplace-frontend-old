import { useEffect, useState } from "react";
import { Contribution, repository } from "./repository";

export const useContributions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true);
      try {
        const contributions = await repository.list();
        setContributions(contributions);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);

  return { loading, contributions };
};
