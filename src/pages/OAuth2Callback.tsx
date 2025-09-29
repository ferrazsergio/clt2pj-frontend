import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";

export default function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginOAuth2 } = useAuth();

    const token = searchParams.get("token");
    const usuario = searchParams.get("usuario");
    const provider = searchParams.get("provider");

    useEffect(() => {
        if (token && usuario && provider) {
            loginOAuth2({ token, usuario, provider });
            setTimeout(() => navigate("/dashboard"), 300);
        } else {
            console.error("Token ou usuário não encontrado nos parâmetros");
            navigate("/login");
        }
    }, []);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                bgcolor: "background.default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <CircularProgress size={48} color="primary" />
                <Typography variant="h6" mt={2}>
                    Autenticando...
                </Typography>
                <Typography color="text.secondary">
                    Aguarde, estamos conectando sua conta.
                </Typography>
            </Paper>
        </Box>
    );
}