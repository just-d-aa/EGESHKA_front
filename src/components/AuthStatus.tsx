import { Link as RouterLink } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

export default function AuthStatus() {
  const { accessToken } = useAuth();

  if (accessToken) {
    return (
      <RouterLink to="/paywall" style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={{ background: "#E82B2B", "&:hover": { background: "#C72222" } }}>
          Оплатить
        </Button>
      </RouterLink>
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
