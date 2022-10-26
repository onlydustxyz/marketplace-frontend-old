import { ComponentStory, ComponentMeta } from "@storybook/react";

import ConnectDot from "./ConnectDot";

export default {
  title: "ConnectDot",
  component: ConnectDot,
} as ComponentMeta<typeof ConnectDot>;

const Template: ComponentStory<typeof ConnectDot> = args => <ConnectDot {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  connected: true,
};
