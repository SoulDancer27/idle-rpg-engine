import React from "react";

export default function useContentSelector(
  defaultComponent: string,
  components: Record<string, JSX.Element>
) {
  const [state, setState] = React.useState<string>(defaultComponent);
  const Content = () => components[state];
  return { state, Content, setState, states: Object.keys(components) };
}
