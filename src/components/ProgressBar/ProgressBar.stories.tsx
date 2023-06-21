import type { Meta, StoryObj } from "@storybook/react";
import { Props } from "./ProgressBar";
import ProgressBar from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    label: "40/100",
    value: 40,
  },
};

export const RightLabel: Story = {
  args: {
    label: "40/100",
    value: 40,
    rightLabel: true,
  },
};

export const FixedWidth: Story = {
  args: { label: "40/100", value: 40, barWidth: 100 },
};
