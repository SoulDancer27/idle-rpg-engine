import React from "react";
import ContextManager from "./ContextManager";

export type DataManagerProps<C> = {
  Context: React.Context<C & ManagementFunctions<C>>;
  defaultContextValue: C;
  localStorageName?: string;
  cookies?: Array<{
    key: string;
    cookieName: string;
    type?: "number" | "string";
  }>;
  autosaveInterval?: number;
  children?: any;
};

type ManagementFunctions<C> = {
  updateContext: (data: Partial<C>) => void;
  setContext: (data: React.SetStateAction<C>) => void;
};

export default function DataManager(props: {
  data: Array<DataManagerProps<any>>;
  children?: any;
}) {
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
