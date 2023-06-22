import { Button, ButtonProps } from "@mui/material";

import React from "react";

type WipeSaveButtonProps<C> = { data: Array<SaveDataItem<C>> } & ButtonProps;

type SaveDataItem<C> = {
  setContext: (data: React.SetStateAction<C>) => void;
  defaultContextValue: C;
  localStorageName: string;
};

export default function WipeSaveButton(props: WipeSaveButtonProps<any>) {
  const { data, ...rest } = props;
  const handleClick = () => {
    for (let item of data) {
      try {
        item.setContext({ ...item.defaultContextValue });
        localStorage.removeItem(item.localStorageName);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Button variant="outlined" color="error" onClick={handleClick} {...rest}>
      Wipe Save
    </Button>
  );
}
