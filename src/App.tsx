import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Container maxWidth="md">
                    <AppRoutes />
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;