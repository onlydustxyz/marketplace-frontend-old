import { ComponentStory, ComponentMeta } from "@storybook/react";
import BackButton from "./View";

export default {
  title: "BackButton",
  component: BackButton,
} as ComponentMeta<typeof BackButton>;

const Template: ComponentStory<typeof BackButton> = args => <BackButton {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  onClick: () => {
    return;
  },
};
