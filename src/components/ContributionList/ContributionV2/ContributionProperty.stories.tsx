import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  ContributionProperty,
  ContributionPropertyColor,
} from "src/components/ContributionList/ContributionV2/ContributionProperty";
import logoPlaceholder from "src/assets/img/project-logo-placeholder.png";
import DifficultyComponent from "src/icons/Difficulty";
import RewardComponent from "src/icons/Reward";
import TechnologyComponent from "src/icons/Technology";

export default {
  title: "ContributionProperty",
  component: ContributionProperty,
  argTypes: {
    textColor: {
      options: Object.values(ContributionPropertyColor),
    },
    children: {
      options: ["Default", "EasyDifficulty", "MediumDifficulty", "HardDifficulty", "Reward", "Technology"],
      mapping: {
        Default: <img height="28px" width="28px" src={logoPlaceholder} className="mr-2.5" />,
        EasyDifficulty: <DifficultyComponent size={18} className="fill-red-300 mr-2.5" />,
        MediumDifficulty: <DifficultyComponent size={18} className="fill-yellow-200 mr-2.5" />,
        HardDifficulty: <DifficultyComponent size={18} className="fill-emerald-300 mr-2.5" />,
        Reward: <RewardComponent size={18} className="fill-yellow-200 mr-2.5" />,
        Technology: <TechnologyComponent size={18} className="fill-white mr-2.5" />,
      },
    },
  },
} as ComponentMeta<typeof ContributionProperty>;

const Template: ComponentStory<typeof ContributionProperty> = args => <ContributionProperty {...args} />;

export const Project = Template.bind({});

Project.args = {
  text: "Test",
  textColor: ContributionPropertyColor.Gray,
  children: <img height="28px" width="28px" src={logoPlaceholder} className="mr-2.5" />,
};

export const EasyDifficulty = Template.bind({});

EasyDifficulty.args = {
  text: "Easy",
  textColor: ContributionPropertyColor.Green,
  children: <DifficultyComponent size={18} className="fill-emerald-300 mr-2.5" />,
};

export const MediumDifficulty = Template.bind({});

MediumDifficulty.args = {
  text: "Medium",
  textColor: ContributionPropertyColor.Yellow,
  children: <DifficultyComponent size={18} className="fill-yellow-300 mr-2.5" />,
};

export const HardDifficulty = Template.bind({});

HardDifficulty.args = {
  text: "Hard",
  textColor: ContributionPropertyColor.Red,
  children: <DifficultyComponent size={18} className="fill-red-300 mr-2.5" />,
};

export const Reward = Template.bind({});

Reward.args = {
  text: "500-750 USDC",
  textColor: ContributionPropertyColor.Yellow,
  children: <RewardComponent size={18} className="fill-yellow-200 mr-2.5" />,
};

export const Technology = Template.bind({});

Technology.args = {
  text: "Cairo",
  textColor: ContributionPropertyColor.White,
  children: <TechnologyComponent size={18} className="fill-white mr-2.5" />,
};
