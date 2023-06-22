import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { getSpacing } from "../../utils";
import { getWindowDimensions } from "../../utils/useWindowDimensions";
import ExportSave from "./SettingsPage/ExportSave";
import GameSpeed from "./SettingsPage/GameSpeed";
import ImportSave from "./SettingsPage/ImportSave";
import NumberNotation from "./SettingsPage/NumberNotation";
import TickRate from "./SettingsPage/TickRate";
import WipeSaveButton from "./SettingsPage/WipeSaveButton";
import { ContextManagerProps, SettingsPageData } from "../../Interfaces";

export type SettingsPageProps = {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  data: Array<ContextManagerProps<any>>;
};

export default function SettingsPage(props: SettingsPageProps) {
  const { setOpened, data } = props;
  const theme = useTheme();
  const { width, height } = getWindowDimensions();
  const localStorageData = data.filter((item) => item.localStorageName);
  let settingPageData: SettingsPageData<any>[] = [];
  for (let item of localStorageData) {
    if (item.localStorageName) {
      settingPageData.push({
        Context: item.Context,
        defaultContextValue: item.defaultContextValue,
        localStorageName: item.localStorageName,
      });
    }
  }

  const Contexts = settingPageData.map((item) =>
    React.useContext(item.Context)
  );

  return (
    <Paper>
      <Box
        position="absolute"
        width={width}
        height={height - getSpacing(theme, 8)}
        top={getSpacing(theme, 8)}
        left={0}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        paddingTop={2}
      >
        <Box
          display="flex"
          width={width}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box />
          <Typography variant="h4" sx={{ alignSelf: "center" }}>
            Settings
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setOpened((x) => !x)}
            sx={{ marginRight: 2 }}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </Box>

        <TickRate />
        <GameSpeed />
        <NumberNotation />
        <Box display="flex" flexDirection={"column"}>
          <Typography variant="h6">Save Manager</Typography>
        </Box>
        <Box display="flex" gap={2}>
          <ExportSave
            variant="outlined"
            color="success"
            localStorageItems={settingPageData.map(
              (item) => item.localStorageName
            )}
          />
          <ImportSave
            variant="outlined"
            color="primary"
            format={settingPageData.map((item, index) => ({
              setContext: Contexts[index].setContext,
              key: item.localStorageName,
            }))}
          />
          <WipeSaveButton
            variant="outlined"
            color="error"
            data={localStorageData.map(
              (item, index) =>
                ({
                  setContext: Contexts[index].setContext,
                  defaultContextValue: item.defaultContextValue,
                  localStorageName: item.localStorageName,
                } as any)
            )}
          />
        </Box>
      </Box>
    </Paper>
  );
}
