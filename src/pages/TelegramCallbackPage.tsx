import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginWithProvider } from "../api/auth";

export default function TelegramCallbackPage() {
  const [error, setError] = useState<string | null>(null);
  const { setTokens } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const match = location.pathname.match(/telegramToken=(.+)/);
    if (!match) {
      setError("Токен не найден в ссылке");
      return;
    }

    const token = match[1];
    console.log("[Telegram] token:", token.slice(0, 10) + "...");

    loginWithProvider(token, "telegram")
      .then((tokens) => {
        console.log("[Telegram] loginWithProvider success:", tokens);
        setTokens(tokens);
        navigate("/paywall");
      })
      .catch((e) => {
        console.error("[Telegram] error:", e);
        setError(e instanceof Error ? e.message : "Ошибка авторизации");
      });
  }, [location.pathname, setTokens, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {error ? (
        <>
          <Typography sx={{ color: "#d32f2f", fontSize: 16, textAlign: "center" }}>
            {error}
          </Typography>
          <Typography
            component={RouterLink}
            to="/login"
            sx={{ color: "#00BBFF", fontSize: 16 }}
          >
            Вернуться на страницу входа
          </Typography>
        </>
      ) : (
        <>
          <CircularProgress sx={{ color: "#00BBFF" }} />
          <Typography sx={{ fontSize: 16, color: "#666" }}>
            Авторизация через Telegram...
          </Typography>
        </>
      )}
    </Box>
  );
}
