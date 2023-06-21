// Added due to mui behavior change on v5

import { Theme } from "@mui/material";

// The spacing return value was changed from number to string with 'px' at the end
export default function getSpacing(theme: Theme, value: number) {
  return Number(theme.spacing(value).slice(0, -2));
}
