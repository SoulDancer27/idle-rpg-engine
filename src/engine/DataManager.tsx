import React from "react";
import ContextManager from "./ContextManager";
import { DataManagerProps } from "../Interfaces";

export default function DataManager<C>(props: DataManagerProps<C>) {
  const { data } = props;
  const lastIndex = data.length - 1;
  let childElement = props.children;
  for (let i = lastIndex; i >= 0; i--) {
    childElement = React.createElement(
      ContextManager<any>,
      {
        Context: data[i].Context,
        defaultContextValue: data[i].defaultContextValue,
        localStorageName: data[i].localStorageName,
        cookies: data[i].cookies,
        autosaveInterval: data[i].autosaveInterval,
      },
      childElement
    );
  }

  return childElement;
}
