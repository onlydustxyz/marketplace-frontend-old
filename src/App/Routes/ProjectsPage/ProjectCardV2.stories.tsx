import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProjectCard from "./ProjectCardV2";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "ProjectCardV2",
  component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ProjectCard> = args => <ProjectCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: "test-id",
  title: "Starknet.dart",
  description: "An interactive tutorial to get you up and running with Starknet up and running interactive…",
  alreadyGrantedAmount: 3000,
};
