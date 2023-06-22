import React from "react";
import { trivialNumber, exponentialNumber } from "../../utils";
import { defaultUpdateInterval } from "../constants";
import { SettingsContextType } from "../../Interfaces";

// Declarations for the React Context type

export const settingsContextDefault: SettingsContextType = {
  tickRate: 1000 / defaultUpdateInterval,
  gameSpeed: 1,
  notation: "trivial",
};

/** Context initializator */
export const SettingsContext = React.createContext({
  ...settingsContextDefault,
  updateContext: (newData: Partial<SettingsContextType>) => {},
  setContext: (value: React.SetStateAction<SettingsContextType>) => {},
});

export default SettingsContext;

export function useNumberParser() {
  const { notation } = React.useContext(SettingsContext);
  return (num: number): string => {
    if (notation === "trivial") return trivialNumber(num);
    if (notation === "exponential") return exponentialNumber(num);
    return num.toFixed(2);
  };
}
