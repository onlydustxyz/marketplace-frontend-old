import { ComponentStory, ComponentMeta } from "@storybook/react";

import ContributionV2 from "src/components/ContributionList/ContributionV2";
import { ContributionStatusEnum, ContributionWithStatus } from "src/state";

export default {
  title: "ContributionV2",
  component: ContributionV2,
} as ComponentMeta<typeof ContributionV2>;

const Template: ComponentStory<typeof ContributionV2> = args => <ContributionV2 {...args} />;

const defaultContribution: ContributionWithStatus = {
  title: "Test: ",
  id: "id",
  project_id: "project_id",
  status: ContributionStatusEnum.OPEN,
  description: "",
  github_link: "",
  gate: 0,
  gateMissingCompletedContributions: 0,
  metadata: {},
  available_slot_count: 1,
  max_slot_count: 1,
  project: {
    title: "title",
    logo: "https://app.onlydust.xyz/assets/onlydust-logo.5f8cc594.png",
    members: [],
  },
};

export const Open = Template.bind({});

Open.args = {
  contribution: defaultContribution,
};

export const Closed = Template.bind({});

Closed.args = {
  contribution: {
    ...defaultContribution,
    status: ContributionStatusEnum.CLOSED,
  },
};

export const Assigned = Template.bind({});

Assigned.args = {
  contribution: {
    ...defaultContribution,
    status: ContributionStatusEnum.ASSIGNED,
  },
};
