import { FC } from "react";

import { Contribution, Project } from "src/model/contributions/repository";
import logoPlaceholder from "src/assets/img/project-logo-placeholder.png";
import ContributionList from "src/components/ContributionList";
import BackButton from "src/components/BackButton";

import Link from "./Link";

type Props = {
  contributions: Contribution[];
  project?: Project;
};
const ProjectDetailsPage: FC<Props> = ({ contributions, project }) => {
  if (!project) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center mt-8 max-w-screen-xl w-full">
      <BackButton className="absolute left-[-48px] top-0" />
      <img className="rounded-full" src={project.logo || logoPlaceholder} width={93} />
      <h2 className="mt-6 font-alfreda text-5xl capitalize leading-snug">{project.title}</h2>
      <div className="mt-6 text-light-purple text-xl text-center font-light leading-8 max-w-[560px]">
        {project.description}
      </div>
      <div className="mt-10 flex flex-row gap-4 items-center justify-center">
        {project.website_link && <Link url={project.website_link}>Website</Link>}
        {project.github_link && <Link url={project.github_link}>Github</Link>}
        {project.discord_link && <Link url={project.discord_link}>Discord</Link>}
      </div>
      <h2 className="mt-20 text-4xl font-alfreda">Contributions</h2>
      <ContributionList className="mt-12" contributions={contributions} />
    </div>
  );
};

export default ProjectDetailsPage;
