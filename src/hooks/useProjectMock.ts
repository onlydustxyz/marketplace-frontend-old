import { useEffect, useState } from "react";

export default function useContribution(projectId: string | undefined) {
  const [project, setProject] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!projectId) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setProject({
        projectId,
        title: "the first project",
        description: "# The MD content\nYolo",
        githubLink: "link to repo",
      });
      setIsLoading(false);
    }, 1500);
  }, [projectId]);

  return { project, isLoading, error };
}
