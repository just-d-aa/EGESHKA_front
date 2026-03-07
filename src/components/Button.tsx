import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const Button = styled(MuiButton)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
    padding: "4px 8px",
    height: "36px",
  },
  height: "36px",
  borderRadius: "8px",
  fontFamily: "SF Pro Text",
  padding: "8px 16px",
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 1.5,
  letterSpacing: 0,
  boxShadow: "inset 0px -4px 2px -2px #00000033",
  "&.MuiButton-contained": {
    background: "#00BBFF",
    color: "#FFFFFF",
  },
}));

export type ButtonProps = MuiButtonProps;

export default Button;
