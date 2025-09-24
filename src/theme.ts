import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // Azul Material
        },
        secondary: {
            main: "#43a047", // Verde Material
        },
        background: {
            default: "#f5f6fa",
            paper: "#fff",
        },
        error: {
            main: "#d32f2f",
        },
        warning: {
            main: "#ffa726",
        },
        info: {
            main: "#0288d1",
        },
        success: {
            main: "#388e3c",
        },
        text: {
            primary: "#212121",
            secondary: "#757575",
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 2px 12px rgba(33, 150, 243, 0.08)",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: 16,
                },
            },
        },
    },
});

export default theme;