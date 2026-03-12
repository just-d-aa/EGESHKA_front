import { useState, useEffect, useCallback, useRef } from "react";
import { AppBar, Box, CircularProgress, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Toolbar from "../components/Toolbar";
import HeaderIcon from "../assets/header";
import AuthStatus from "../components/AuthStatus";
import { useAuth } from "../context/AuthContext";
import { loginWithProvider } from "../api/auth";

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}


function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.07l3.66-2.98z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 13.67l-2.966-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.994.889z" />
    </svg>
  );
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTokens } = useAuth();
  const navigate = useNavigate();

  const handleGoogleCallback = useCallback(
    async (response: { credential: string }) => {
      setError(null);
      setLoading(true);
      try {
        console.log("[Google] credential:", response.credential.slice(0, 30) + "...");
        const tokens = await loginWithProvider(response.credential, "google");
        console.log("[Google] loginWithProvider success:", tokens);
        setTokens(tokens);
        navigate("/paywall");
      } catch (e) {
        console.error("[Google] error:", e);
        setError(e instanceof Error ? e.message : "Ошибка авторизации");
      } finally {
        setLoading(false);
      }
    },
    [setTokens, navigate],
  );

  useEffect(() => {
    if (!window.AppleID || !import.meta.env.VITE_APPLE_CLIENT_ID) return;
    try {
      window.AppleID.auth.init({
        clientId: import.meta.env.VITE_APPLE_CLIENT_ID as string,
        scope: "name email",
        redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI as string,
        usePopup: true,
      });
    } catch (e) {
      console.error("Apple Sign In init failed:", e);
    }
  }, []);

  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !import.meta.env.VITE_GOOGLE_CLIENT_ID || !googleBtnRef.current) return;
    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
        callback: handleGoogleCallback,
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        width: 400,
      });
    } catch (e) {
      console.error("Google Sign In init failed:", e);
    }
  }, [handleGoogleCallback]);


  async function handleAppleLogin() {
    setError(null);
    setLoading(true);
    try {
      const data = await window.AppleID.auth.signIn();
      console.log("[Apple] signIn data:", JSON.stringify(data));
      const token = data.authorization.id_token;
      console.log("[Apple] id_token:", token ? token.slice(0, 30) + "..." : "UNDEFINED");
      const tokens = await loginWithProvider(token, "apple");
      console.log("[Apple] loginWithProvider success:", tokens);
      setTokens(tokens);
      navigate("/paywall");
    } catch (e) {
      console.error("[Apple] error:", e);
      setError(e instanceof Error ? e.message : "Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <AppBar position="sticky" color="inherit">
        <Toolbar className="toolbar">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "8px",
              alignItems: "center",
              maxWidth: "1272px",
              width: "100%",
              margin: "auto",
              height: "40px",
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex", gap: 3, alignItems: "center" }}>
              <RouterLink to="/" style={{ display: "flex", alignItems: "center" }}>
                <HeaderIcon />
              </RouterLink>
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{ flexGrow: 1, color: "#00BBFF", textDecoration: "none" }}
              >
                ЕГЭШКА
              </Typography>
            </Box>
            <AuthStatus />
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          padding: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Typography variant="h2" sx={{ color: "#00BBFF", textAlign: "center", fontSize: 32 }}>
            Войти в ЕГЭШКУ
          </Typography>

          <Button
            fullWidth
            variant="contained"
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AppleIcon />}
            disabled={loading}
            onClick={handleAppleLogin}
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              height: "52px",
              fontSize: 16,
              "&:hover": { backgroundColor: "#222222" },
              "&.Mui-disabled": { backgroundColor: "#333333", color: "#888888" },
            }}
          >
            Sign in with Apple
          </Button>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              "&:hover .google-btn-face": { backgroundColor: "#F0F9FF" },
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              className="google-btn-face"
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                height: "52px",
                fontSize: 16,
                borderColor: "#00BBFF",
                borderWidth: 2,
                boxShadow: "inset 0px -4px 2px -2px #00BBFF33",
                transition: "background-color 0.2s",
                pointerEvents: "none",
              }}
            >
              Sign in with Google
            </Button>
            <Box
              ref={googleBtnRef}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
                "& iframe": { width: "100% !important", height: "100% !important" },
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<TelegramIcon />}
            onClick={() => window.open("https://t.me/egeshka_auth_bot", "_blank")}
            sx={{
              height: "52px",
              fontSize: 16,
            }}
          >
            Войти через Telegram
          </Button>

          {error && (
            <Typography sx={{ color: "#d32f2f", fontSize: 14, textAlign: "center", fontFamily: "SF Pro Text" }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
