import React from "react";
import { defaultAutosaveInterval } from "./constants";

type ContextManagerProps = {
  storageItemName: string;
};

type ManagementFunctions<C> = {
  updateContext: (data: Partial<C>) => void;
  setContext: (data: React.SetStateAction<C>) => void;
};

export default function withContextManager<C>(
  WrappedComponent: React.FunctionComponent,
  Context: React.Context<C & ManagementFunctions<C>>,
  defaultContextValue: C
) {
  return (props: ContextManagerProps & { children: any }) => {
    const [context, setContext] = React.useState(defaultContextValue);
    /** Updates player context using shallow merge of UserContext attributes. */
    const updateContext = (newData: Partial<C>) =>
      setContext((data) => ({ ...data, ...newData }));

    // Load save data from Local Storage
    const [loaded, setLoaded] = React.useState<boolean>(false);
    React.useEffect(() => {
      const contextData = localStorage.getItem(props.storageItemName);
      if (contextData) setContext(JSON.parse(contextData));
      setLoaded(true);
    }, []);

    // Autosave
    React.useEffect(() => {
      const autosaveInterval = setInterval(() => {
        // Thats a hacky way to access current state value inside useEffect run only once
        setContext((data) => {
          localStorage.setItem(props.storageItemName, JSON.stringify(data));
          return data;
        });
      }, defaultAutosaveInterval);
      return () => {
        clearInterval(autosaveInterval);
      };
    }, []);

    return (
      <Context.Provider value={{ ...context, updateContext, setContext }}>
        {loaded && <WrappedComponent />}
      </Context.Provider>
    );
  };
}
