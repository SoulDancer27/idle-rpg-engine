import { Box, Button, ButtonProps, Input } from "@mui/material";
import React from "react";
import { fileToGameData } from "../../../utils/fileManagement";
import { FileDataFormat } from "../../../Interfaces";

export type ImportSaveButtonProps = {
  format: FileDataFormat<any>[];
} & ButtonProps & { htmlFor?: string; component?: string };

export default function ImportSaveButton(props: ImportSaveButtonProps) {
  const { format, ...rest } = props;
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const input = event.target as HTMLInputElement;
      if (input.files === null) {
        throw new Error("No files submitted!");
      }
      const file = input.files.item(0);
      if (!file) throw new Error("File is undefined");
      await fileToGameData(file, format);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <form encType="multipart/form-data" onChange={(event) => submit(event)}>
        <Button component="label" htmlFor="fileimport" {...rest}>
          Import Save
        </Button>
        <Input type="file" id="fileimport" style={{ display: "none" }} />
      </form>
    </Box>
  );
}
