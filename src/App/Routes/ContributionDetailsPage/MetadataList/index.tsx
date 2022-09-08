import { FC } from "react";
import cn from "classnames";

import Difficulty from "src/icons/Difficulty";
import { Contribution } from "src/state";
import MetadataItem from "./MetadataItem";
import Technology from "src/icons/Technology";
import Type from "src/icons/Type";
import Context from "src/icons/Context";
import Duration from "src/icons/Duration";

type Props = {
  className?: string;
  contribution: Contribution;
};

const MetadataList: FC<Props> = ({ className, contribution }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-5 py-2 md:py-10 bg-mid-blue/50 backdrop-blur-[6px] shadow-contribution-metadata",
        className
      )}
    >
      <MetadataItem
        label="Difficulty"
        value={contribution.metadata.difficulty}
        renderIcon={() => <Difficulty className="fill-light-blue mr-2" size={16} />}
      />
      <MetadataItem
        label="Technology"
        value={contribution.metadata.technology}
        renderIcon={() => <Technology className="fill-light-blue mr-2" size={16} />}
      />
      <MetadataItem
        label="Type"
        value={contribution.metadata.type}
        renderIcon={() => <Type className="fill-light-blue mr-2" size={16} />}
      />
      <MetadataItem
        label="Context"
        value={contribution.metadata.context}
        renderIcon={() => <Context className="fill-light-blue mr-2" size={16} />}
      />
      <MetadataItem
        label="Duration"
        value={contribution.metadata.duration}
        renderIcon={() => <Duration className="fill-light-blue mr-2" size={16} />}
      />
    </div>
  );
};

export default MetadataList;
