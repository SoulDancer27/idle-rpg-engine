import React from "react";
import { defaultAutosaveInterval } from "./constants";
import { accessCookie, createCookie } from "../utils";

export type ContextManagerProps<C> = {
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

export default function ContextManager<C>(props: ContextManagerProps<C>) {
  const {
    defaultContextValue,
    Context,
    localStorageName,
    cookies,
    autosaveInterval,
  } = props;
  const [context, setContext] = React.useState(defaultContextValue);
  /** Updates player context using shallow merge of UserContext attributes. */
  const updateContext = (newData: Partial<C>) =>
    setContext((data) => ({ ...data, ...newData }));

  // Load save data from Local Storage
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (localStorageName) {
      const contextData = localStorage.getItem(localStorageName);
      if (contextData) setContext(JSON.parse(contextData));
    }
    if (cookies && cookies.length > 0) {
      let contextData: any = {};
      for (let item of cookies) {
        try {
          let value = accessCookie(item.cookieName);
          if (value)
            contextData[item.key] =
              item.type && item.type === "number" ? Number(value) : value;
        } catch (error) {
          console.log(error);
        }
      }
      setContext((data) => ({ ...data, ...contextData }));
    }
    setLoaded(true);
  }, []);

  // Autosave
  React.useEffect(() => {
    const autosave = setInterval(() => {
      // Thats a hacky way to access current state value inside useEffect run only once
      if (localStorageName)
        setContext((data) => {
          localStorage.setItem(localStorageName, JSON.stringify(data));
          return data;
        });
    }, autosaveInterval || defaultAutosaveInterval);
    return () => {
      clearInterval(autosave);
    };
  }, []);

  // Save on change
  React.useEffect(() => {
    if (cookies) {
      for (let item of cookies) {
        try {
          if ((context as any)[item.key])
            createCookie(
              item.cookieName,
              (context as any)[item.key].toString(),
              1000
            );
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [context]);

  return (
    <Context.Provider value={{ ...context, updateContext, setContext }}>
      {loaded && props.children}
    </Context.Provider>
  );
}
