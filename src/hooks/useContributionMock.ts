import { useEffect, useState } from "react";
import NotFoundError from "src/utils/errors/NotFoundError";

export default function useContribution(contributionId: string | undefined) {
  const [contribution, setContribution] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!contributionId) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (contributionId === "not-found") {
        setContribution(undefined);
        setError(new NotFoundError());
      } else {
        setContribution({
          contributionId,
          projectId: "a54be8c",
          title: "Contribution title",
          description: "#The MD content",
          status: "assigned",
          gates: [],
          metadata: {
            //everything that varies with the status
            assignee: "0x1234",
          },
        });
      }
      setIsLoading(false);
    }, 1500);
  }, [contributionId]);

  return { contribution, isLoading, error };
}
