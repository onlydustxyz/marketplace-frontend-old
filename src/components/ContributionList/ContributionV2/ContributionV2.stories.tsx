import { ComponentStory, ComponentMeta } from "@storybook/react";

import ContributionV2, { ContributionProps } from "src/components/ContributionList/ContributionV2";
import { ContributionStatusEnum } from "src/state";

export default {
  title: "ContributionV2",
  component: ContributionV2,
} as ComponentMeta<typeof ContributionV2>;

const Template: ComponentStory<typeof ContributionV2> = args => <ContributionV2 {...args} />;

const defaultContribution: ContributionProps = {
  title: "Test: ",
  status: ContributionStatusEnum.OPEN,
  project: {
    title: "title",
    logo: "https://app.onlydust.xyz/assets/onlydust-logo.5f8cc594.png",
    members: [],
  },
};

export const Open = Template.bind({});

Open.args = defaultContribution;

export const Closed = Template.bind({});

Closed.args = {
  ...defaultContribution,
  status: ContributionStatusEnum.CLOSED,
};

export const Assigned = Template.bind({});

Assigned.args = {
  ...defaultContribution,
  status: ContributionStatusEnum.ASSIGNED,
};
