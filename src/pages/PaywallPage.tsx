import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Button from "../components/Button";
import SubscriptionBird from "../assets/subscriptionBird";
import { InfinityIcon, NoAdsIcon, TreasureIcon } from "../assets/paywallIcons";
import { useAuth } from "../context/AuthContext";
import { createPayment } from "../api/auth";

const benefits = [
  { icon: <InfinityIcon />, text: "Бесконечные жизни" },
  { icon: <NoAdsIcon />, text: "Никакой рекламы" },
  { icon: <TreasureIcon />, text: "100% тренажёров открыто" },
];

function CheckIcon() {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
      <path
        d="M15.282,5.294C15.58,4.943 16.106,4.9 16.456,5.198C16.807,5.496 16.85,6.022 16.552,6.373L9.468,14.706C9.166,15.063 8.629,15.1 8.28,14.79L4.53,11.456C4.186,11.15 4.155,10.624 4.46,10.28C4.766,9.936 5.293,9.905 5.637,10.21L8.75,12.978L15.282,5.294Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function PaywallPage() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  async function handlePayment() {
    if (!agreed || !accessToken) return;
    setError(null);
    setLoading(true);
    try {
      const { paymentUrl } = await createPayment(accessToken);
      window.location.href = paymentUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка создания платежа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #E8ECFF 0%, #B0BBFA 30%, #7B8AF5 60%, #4A50E0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        px: 2,
        pb: 4,
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontFamily: "Unbounded, sans-serif",
          fontWeight: 900,
          fontSize: { xs: 48, sm: 64 },
          color: "#3A3FBF",
          lineHeight: 0.9,
          textAlign: "center",
          mt: 4,
          zIndex: 1,
          textTransform: "uppercase",
        }}
      >
        ЕГЭШКА
        <br />
        PRO
      </Typography>

      {/* Bird */}
      <Box
        sx={{
          zIndex: 2,
          mt: -2,
          mb: -2,
          width: { xs: 280, sm: 340 },
        }}
      >
        <SubscriptionBird />
      </Box>

      {/* Subtitle */}
      <Typography
        sx={{
          fontFamily: "Unbounded, sans-serif",
          fontWeight: 700,
          fontSize: { xs: 20, sm: 24 },
          color: "#fff",
          textAlign: "center",
          mb: 3,
          zIndex: 1,
        }}
      >
        Учись без ограничений!
      </Typography>

      {/* Benefits card */}
      <Box
        sx={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.25)",
          px: 3,
          py: 2.5,
          width: "100%",
          maxWidth: 360,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          mb: 3,
          zIndex: 1,
        }}
      >
        {benefits.map((b) => (
          <Box
            key={b.text}
            sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
          >
            {/* Icon with glow behind */}
            <Box
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Glow blur effect */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 4,
                  borderRadius: "50%",
                  background: "rgba(180,190,255,0.5)",
                  filter: "blur(10px)",
                }}
              />
              <Box sx={{ position: "relative", zIndex: 1, display: "flex" }}>
                {b.icon}
              </Box>
            </Box>
            <Typography
              sx={{
                fontFamily: "SF Pro Text, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: "#fff",
              }}
            >
              {b.text}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* CTA Button */}
      <Button
        variant="contained"
        disabled={!agreed || loading}
        onClick={handlePayment}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
        sx={{
          width: "100%",
          maxWidth: 360,
          height: 56,
          borderRadius: "16px",
          fontSize: 18,
          background: "#E82B2B",
          "&.MuiButton-contained": {
            background: agreed ? "#E82B2B" : "rgba(232,43,43,0.4)",
          },
          "&:hover": {
            background: "#C72222",
          },
          "&.Mui-disabled": {
            background: "rgba(232,43,43,0.4)",
            color: "rgba(255,255,255,0.6)",
          },
        }}
      >
        Открыть полный доступ
      </Button>

      {error && (
        <Typography
          sx={{
            color: "#FFD0D0",
            fontSize: 14,
            textAlign: "center",
            fontFamily: "SF Pro Text",
            mt: 1,
            zIndex: 1,
          }}
        >
          {error}
        </Typography>
      )}

      {/* Terms checkbox */}
      <Box
        onClick={() => setAgreed((v) => !v)}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          mt: 2,
          maxWidth: 360,
          width: "100%",
          cursor: "pointer",
          userSelect: "none",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: 22,
            height: 22,
            flexShrink: 0,
            borderRadius: "6px",
            border: agreed ? "2px solid #E82B2B" : "2px solid rgba(255,255,255,0.6)",
            background: agreed ? "#E82B2B" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "1px",
            transition: "background 0.15s",
          }}
        >
          {agreed && <CheckIcon />}
        </Box>
        <Typography
          sx={{
            fontFamily: "SF Pro Text, sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.4,
          }}
        >
          Согласен с&nbsp;условиями подписки 299&nbsp;₽ в&nbsp;месяц
          и&nbsp;её автоматическим продлением
        </Typography>
      </Box>
    </Box>
  );
}
