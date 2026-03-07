import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

export default function AuthStatus() {
  const { accessToken } = useAuth();

  if (accessToken) {
    return (
      <Typography sx={{ color: "#00BBFF", fontFamily: "SF Pro Text", fontSize: 14 }}>
        {accessToken.slice(0, 8)}...
      </Typography>
    );
  }

  return (
    <RouterLink to="/login" style={{ textDecoration: "none" }}>
      <Button className="Button" variant="outlined" sx={{ borderColor: "#00BBFF", color: "#00BBFF" }}>
        Войти
      </Button>
    </RouterLink>
  );
}
