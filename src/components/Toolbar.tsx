import { Toolbar as MuiToolbar, ToolbarProps as MuiToolbarProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    paddingLeft: "84px",
    paddingRight: "84px",
  },
}));

export type ToolbarProps = MuiToolbarProps;

export default Toolbar;
