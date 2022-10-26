import { ComponentStory, ComponentMeta } from "@storybook/react";

import Reward from "./Reward";

export default {
  title: "Reward",
  component: Reward,
} as ComponentMeta<typeof Reward>;

const Template: ComponentStory<typeof Reward> = args => <Reward {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  token: "$",
  value: 1,
};
