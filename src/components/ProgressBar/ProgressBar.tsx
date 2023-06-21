import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import React from "react";

export type Props = {
  label: string;
  value: number;
  barWidth?: string | number;
  rightLabel?: boolean;
} & LinearProgressProps;

export default function ProgressBar(props: Props) {
  const { label, rightLabel, barWidth, ...rest } = props;
  const isRight = rightLabel;
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {!isRight && (
        <Typography variant="body1" color="text.primary">
          {label}
        </Typography>
      )}
      <Box sx={{ width: barWidth || "60%", m: 1 }}>
        <LinearProgress variant="determinate" color="primary" {...rest} />
      </Box>
      {isRight && (
        <Typography variant="body1" color="text.primary">
          {label}
        </Typography>
      )}
    </Box>
  );
}
