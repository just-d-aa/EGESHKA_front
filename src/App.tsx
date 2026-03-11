// import { ReactNode } from "react";
import { AppBar, Typography, Box, createTheme, Link } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useRive } from "@rive-app/react-canvas";

import HeaderIcon from "./assets/header";
import { Icon } from "./assets/icon";
import Button from "./components/Button";
import Toolbar from "./components/Toolbar";
import LoginPage from "./pages/LoginPage";
import TelegramCallbackPage from "./pages/TelegramCallbackPage";
import PaywallPage from "./pages/PaywallPage";
import { AuthProvider } from "./context/AuthContext";
import AuthStatus from "./components/AuthStatus";

import "./App.css";

import duckRive from "./assets/duck.riv";

const themeCreated = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1090,
      lg: 1200,
      xl: 1536,
    },
  },
});

export function Anime({ artboard, stateMachines }: { artboard: string; stateMachines: string }) {
  const { RiveComponent } = useRive({
    src: duckRive,
    stateMachines,
    artboard,
    isTouchScrollEnabled: true,
    autoplay: true,
  });

  return (
    <RiveComponent
      style={{
        height: 392,
      }}
    />
  );
}

function LandingPage() {
  return (
    <Box>
      <AppBar position="sticky" color="inherit">
        <Toolbar className="toolbar">
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {},
              display: "flex",
              justifyContent: "space-between",
              gap: "8px",
              alignItems: "center",
              maxWidth: "1272px",
              width: "100%",
              margin: "auto",
              height: "40px",
            })}
          >
            <Box
              sx={(theme) => ({
                [theme.breakpoints.down("sm")]: { gap: 1, fontSize: 12 },
                flexGrow: 1,
                display: "flex",
                gap: 3,
                alignItems: "center",
              })}
            >
              <HeaderIcon />
              <Typography
                variant="h6"
                component="div"
                sx={(theme) => ({ [theme.breakpoints.down("sm")]: { fontSize: 20 }, flexGrow: 1, color: "#00BBFF" })}
              >
                ЕГЭШКА
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button href={"https://kutt.it/egeshka-web-android"} className="Button" variant="contained">
                для Android
              </Button>
              <Button href={"https://kutt.it/egeshka-web-ios"} className="Button" variant="contained">
                для IOS
              </Button>
              <AuthStatus />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          maxWidth: "1440px",
          margin: "auto",
        }}
      >
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 24px 0 24px",
              marginTop: "48px",
            },
            display: "flex",
            alignItems: "center",
            paddingLeft: "84px",
            paddingRight: "84px",
            marginTop: "129px",
            gap: "48px",
          })}
        >
          <div className="halfBox">
            <Typography variant="h1" sx={{ color: "#00BBFF", paddingBottom: "24px" }}>
              Твой верный помощник в&nbsp;подготовке к&nbsp;ЕГЭ!
            </Typography>
            <Typography variant="body1">
              Мы&nbsp;такие&nbsp;же ребята, как и&nbsp;ты. Мы&nbsp;сдавали ЕГЭ и&nbsp;знаем, как это бывает. Поэтому
              мы&nbsp;создали ЕГЭШКУ - приложение, которое всегда с&nbsp;тобой. Дома, в&nbsp;такси,
              на&nbsp;уроке&nbsp;&mdash; ЕГЭШКА всегда рядом!
            </Typography>
          </div>
          <div className="halfBox anime">
            <Anime artboard="Artboard 2" stateMachines="State Machine 2" />
          </div>
        </Box>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column-reverse",
              padding: "0 24px 0 24px",
              marginTop: "48px",
            },
            display: "flex",
            alignItems: "center",
            paddingLeft: "84px",
            paddingRight: "84px",
            marginTop: "150px",
            gap: "48px",
          })}
        >
          <div className="halfBox anime">
            <Anime artboard="Artboard 14" stateMachines="State Machine 14" />
          </div>
          <div className="halfBox">
            <Typography variant="h1" sx={{ color: "#00BBFF", paddingBottom: "24px" }}>
              Потому что это просто и&nbsp;весело!
            </Typography>
            <Typography variant="body1">
              Самые актуальные варианты от&nbsp;&laquo;ФИПИ&raquo; с&nbsp;подробным разбором. Забудь о&nbsp;скучных
              тестах&nbsp;&mdash; выбирай ответы из вариантов или составляй их&nbsp;из&nbsp;кусочков. Готовься легко
              и&nbsp;с&nbsp;удовольствием!
            </Typography>
          </div>
        </Box>
        <Box
          sx={(theme) => ({
            [themeCreated.breakpoints.down("md")]: {
              flexDirection: "column",
            },
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              borderRadius: 0,
              margin: "150px 0 0 0",
              padding: "24px",
              marginTop: "48px",
            },
            display: "flex",
            alignItems: "center",
            margin: "150px 84px 0 84px",
            padding: "53px 110px",
            gap: "48px",
            backgroundColor: "#00BBFF",
            borderRadius: "16px",
          })}
        >
          <div className="halfBox anime" style={{ backgroundColor: "white" }}>
            <Anime artboard="Artboard 15" stateMachines="State Machine 15" />
          </div>
          <div className="halfBox">
            <Typography variant="h1" sx={{ color: "white", paddingBottom: "24px" }}>
              Тренируйся
              <br /> по-новому!
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Выбирай ответ или собирай его из&nbsp;кусочков. Так проще и&nbsp;интереснее!
            </Typography>
          </div>
        </Box>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              padding: "0 24px 0 24px",
              marginTop: "48px",
            },
            display: "flex",
            paddingLeft: "84px",
            paddingRight: "84px",
            marginTop: "129px",
            gap: "48px",
          })}
        >
          <div className="halfBox">
            <Typography variant="h1" sx={{ color: "#00BBFF", paddingBottom: "24px" }}>
              Всегда свежие задания!
            </Typography>
            <Typography variant="body1">
              Самые новые варианты от&nbsp;&laquo;ФИПИ&raquo;. С&nbsp;нами ты&nbsp;получишь доступ к&nbsp;самым
              актуальным материалам для подготовки.
            </Typography>
          </div>
          <div className="halfBox">
            <Typography variant="h1" sx={{ color: "#00BBFF", paddingBottom: "24px" }}>
              Никакой
              <br /> рекламы!
            </Typography>
            <Typography variant="body1">Только подготовка - ничего лишнего.</Typography>
          </div>
        </Box>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              padding: 0,
              marginTop: "48px",
            },
            display: "flex",
            paddingLeft: "84px",
            paddingRight: "84px",
            margin: "auto",
            marginTop: "165px",
            maxWidth: "950px",
            gap: "48px",
          })}
        >
          <div className="halfBox anime">
            <Anime artboard="Artboard 16" stateMachines="State Machine 16" />
          </div>
        </Box>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              padding: "0 24px 0 24px",
              textAlign: "left",
              marginTop: "0px",
            },
            display: "flex",
            justifyContent: "center",
            paddingLeft: "84px",
            paddingRight: "84px",
            marginTop: "146px",
            textAlign: "center",
          })}
        >
          <Box
            sx={{
              width: "612px",
            }}
          >
            <Typography variant="h1" sx={{ color: "#00BBFF", paddingBottom: "24px" }}>
              Скачай ЕГЭШКУ и&nbsp;вперед к успеху!
            </Typography>
            <Typography variant="body1">
              ЕГЭШКА&nbsp;&mdash; это не&nbsp;просто тренажер, это твой друг и&nbsp;помощник. Скачивай приложение
              и&nbsp;убедись сам!
            </Typography>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              padding: "0 24px 0 24px",
              marginTop: "0px",
            },
            display: "flex",
            position: "relative",
            justifyContent: "center",
            paddingLeft: "84px",
            paddingRight: "84px",
            marginTop: "6px",
            textAlign: "center",
          })}
        >
          <Icon />
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                width: "100%",
                marginLeft: "0px",
              },
              display: "flex",
              position: "absolute",
              top: "40%",
              padding: "0 24px 0 24px",
              // margin: "auto",
              width: "90vw",
              marginLeft: "-50px",
              maxWidth: "800px",
              justifyContent: "space-between",
            })}
          >
            <Button href={"https://kutt.it/egeshka-web-android"} className="Button" variant="contained">
              для Android
            </Button>
            <Button href={"https://kutt.it/egeshka-web-ios"} className="Button" variant="contained">
              для IOS
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            padding: "170px 24px 0px 24px",
            marginTop: "48px",
            paddingTop: "52px",
            fontSize: "14px",
            height: "250px",
          },
          position: "relative",
          marginTop: "303px",
          height: "300px",
          backgroundColor: "#00BBFF",
          padding: "120px 84px 0px 84px",
        })}
      >
        <Box
          sx={{
            maxWidth: "1440px",
            margin: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "white",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <div style={{ width: "392px" }}>
              ПРИЛОЖЕНИЕ:
              <br />
              <Link href={"https://kutt.it/egeshka-web-android"} target="_blank" color="inherit">
                ЕГЭШКА для Android
              </Link>
              <br />
              <Link href={"https://kutt.it/egeshka-web-ios"} target="_blank" color="inherit">
                ЕГЭШКА для iOS
              </Link>
              <br />
            </div>
            <div style={{ width: "392px" }}>
              СОЦСЕТИ:
              <br />
              <Link href={"https://kutt.it/egeska-web-vk"} target="_blank" color="inherit">
                Вконтакте
              </Link>
              <br />
              <Link href={"https://kutt.it/egeska-web-tg"} target="_blank" color="inherit">
                Канал в Телеграмм
              </Link>
            </div>
            <div style={{ width: "392px" }}>
              ПОДДЕРЖАТЬ ЕГЭШКУ
              <br />
              <Link href={"https://kutt.it/egeska-web-vk"} target="_blank" color="inherit">
                Вконтакте
              </Link>
              <br />
              <Link href={"https://kutt.it/egeshka-web-donation"} target="_blank" color="inherit">
                QR-код СБП
              </Link>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app/*" element={<TelegramCallbackPage />} />
        <Route path="/paywall" element={<PaywallPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
