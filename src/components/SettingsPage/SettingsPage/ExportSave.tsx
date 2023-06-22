import { Button, ButtonBaseProps, ButtonProps } from "@mui/material";
import React from "react";
import { localStorageToFile } from "../../../utils";

export type ExportSaveButtonProps = {
  localStorageItems: Array<string>;
} & ButtonProps;

export default function ExportSaveButton(props: ExportSaveButtonProps) {
  const { localStorageItems, ...rest } = props;

  return (
    <Button onClick={() => localStorageToFile(localStorageItems)} {...rest}>
      Export Save
    </Button>
  );
}
