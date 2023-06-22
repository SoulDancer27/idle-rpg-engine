// Data Management Interfaces
export type ContextManagementFunctions<C> = {
  updateContext: (data: Partial<C>) => void;
  setContext: (data: React.SetStateAction<C>) => void;
};

export type ContextManagerProps<C> = {
  Context: React.Context<C & ContextManagementFunctions<C>>;
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

export type DataManagerProps<C> = {
  data: Array<ContextManagerProps<any>>;
  children?: any;
};

export type SettingsContextType = {
  tickRate: number;
  gameSpeed: number;
  notation: "exponential" | "trivial";
};

// Saving Data to files
export type FileDataFormat<C> = {
  key: string; // variable name in game
  setContext: (data: React.SetStateAction<C>) => void;
};

export type SettingsPageData<C> = {
  Context: React.Context<C & ContextManagementFunctions<C>>;
  defaultContextValue: C;
  localStorageName: string;
};
