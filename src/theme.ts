import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1d1d1f", // Apple black, para textos e botões
      light: "#f5f5f7",
      dark: "#6e6e73",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0071e3", // Apple blue, só para detalhes/links
      light: "#e8f0fa",
      dark: "#005bb5",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f7", // Apple gray, ultra clean
      paper: "#fff", // Cards/brancos
    },
    error: {
      main: "#e53935",
      light: "#fdeaea",
      dark: "#b71c1c",
      contrastText: "#fff",
    },
    warning: {
      main: "#ffa726",
      light: "#fff7e6",
      dark: "#b2741e",
      contrastText: "#fff",
    },
    info: {
      main: "#0071e3",
      light: "#e8f0fa",
      dark: "#005bb5",
      contrastText: "#fff",
    },
    success: {
      main: "#43a047",
      light: "#e6f4ea",
      dark: "#25632c",
      contrastText: "#fff",
    },
    text: {
      primary: "#1d1d1f", // Apple black
      secondary: "#6e6e73", // Apple gray
      disabled: "#b0b8c9",
    },
    divider: "#e3e8ee",
    action: {
      hover: "#f5f5f7",    // Hover clean, sem saturação
      selected: "#e8f0fa",
      active: "#1d1d1f",
      disabled: "#b0b8c9",
      focus: "#e8f0fa",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: "'SF Pro Display', 'Inter', 'Roboto', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.7rem", letterSpacing: "-1px", color: "#1d1d1f", lineHeight: 1.18 },
    h2: { fontWeight: 700, fontSize: "2.0rem", letterSpacing: "-0.5px", color: "#1d1d1f", lineHeight: 1.2 },
    h3: { fontWeight: 600, fontSize: "1.7rem", color: "#1d1d1f" },
    h4: { fontWeight: 600, fontSize: "1.3rem" },
    h5: { fontWeight: 600, fontSize: "1.13rem" },
    h6: { fontWeight: 600, fontSize: "1.05rem" },
    button: { textTransform: "none", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "0.01em", color: "#1d1d1f" },
    body1: { fontWeight: 400, fontSize: "1.08rem", color: "#1d1d1f" },
    body2: { fontWeight: 400, fontSize: "0.98rem", color: "#6e6e73" },
    caption: { color: "#6e6e73", fontSize: "0.93rem", fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          fontWeight: 600,
          fontSize: "1.08em",
          padding: "0.7em 1.7em",
          background: "#fff",
          color: "#1d1d1f",
          border: "1.5px solid #e3e8ee",
          boxShadow: "none",
          transition: "background 0.14s, box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
          "&:hover": {
            background: "#f5f5f7",
            borderColor: "#6e6e73",
            color: "#1d1d1f",
            boxShadow: "0 1.5px 16px rgba(0,0,0,0.07)",
            transform: "scale(1.01)",
          },
          "&:active": {
            background: "#e8e8ed",
            color: "#1d1d1f",
            borderColor: "#6e6e73",
          },
          "&.Mui-disabled": {
            background: "#f5f5f7",
            color: "#b0b8c9",
            borderColor: "#e3e8ee",
            cursor: "not-allowed",
          },
        },
        outlined: {
          borderWidth: 2,
          color: "#1d1d1f",
          background: "#fff",
          "&:hover": {
            borderColor: "#0071e3",
            background: "#f5f5f7",
            color: "#0071e3",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 1.5px 16px 0 rgba(0,0,0,0.06)",
          border: "1px solid #e3e8ee",
          background: "#fff",
          transition: "box-shadow 0.14s, border 0.13s",
          "&:hover": {
            boxShadow: "0 3px 28px rgba(0,0,0,0.11)",
            border: "1.7px solid #0071e3",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 18,
          background: "#fff",
          borderRadius: 12,
          fontWeight: 500,
          fontSize: "1.08rem",
          "& .MuiInputBase-root": {
            background: "#fff",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e3e8ee",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6e6e73",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0071e3",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: "1em",
          borderRadius: 12,
          background: "#f5f5f7",
          color: "#1d1d1f",
        },
        colorSuccess: {
          background: "#e6f4ea",
          color: "#43a047",
        },
        colorInfo: {
          background: "#e8f0fa",
          color: "#0071e3",
        },
        colorSecondary: {
          background: "#f5f5f7",
          color: "#222",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: "#e3e8ee",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          fontWeight: 500,
          fontSize: "1.07em",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: 32,
          paddingBottom: 32,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            background: "#fff",
            borderRadius: 12,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          transition: "background 0.13s, box-shadow 0.13s, transform 0.1s",
          "&:hover": {
            background: "#f5f5f7",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            transform: "scale(1.03)",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.03em",
          fontWeight: 500,
          borderRadius: 12,
          background: "#222",
          color: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.11)",
        },
      },
    },
  },
});

export default theme;