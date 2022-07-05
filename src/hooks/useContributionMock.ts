import { useEffect, useState } from "react";
import NotFoundError from "src/utils/errors/NotFoundError";

export default function useContribution(contributionId: string | undefined) {
  const [contribution, setContribution] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
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
          id: contributionId,
          title: "Contribution title",
          description: "#The MD content",
          project: {
            id: "13546",
            title: "the first project",
            description: "# The MD content\nYolo",
            githubLink: "http://example.com/githublink",
          },
        });
      }
      setIsLoading(false);
    }, 1500);
  }, [contributionId]);

  return { contribution, isLoading, error };
}
