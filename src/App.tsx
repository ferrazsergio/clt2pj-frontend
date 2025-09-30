import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/auth-provider.tsx"; // ajuste o caminho se necessário
import './styles/autofill-fix.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <BrowserRouter>
                    <Container maxWidth="md">
                        <AppRoutes />
                    </Container>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;