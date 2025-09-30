import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
    Box,
    Paper,
    Typography,
    CircularProgress,
    Fade,
    Zoom,
    Alert,
} from "@mui/material";

export default function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginOAuth2 } = useAuth();

    const token = searchParams.get("token");
    const usuario = searchParams.get("usuario");
    const provider = searchParams.get("provider");

    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        let redirected = false;
        async function handleCallback() {
            if (token && usuario && provider) {
                try {
                    await loginOAuth2({ token, usuario, provider });
                    setLoading(false);
                    setTimeout(() => {
                        if (!redirected) {
                            navigate("/dashboard");
                            redirected = true;
                        }
                    }, 900);
                } catch (err: any) {
                    setAuthError("Erro ao autenticar via OAuth2. Tente novamente.");
                    setLoading(false);
                    setTimeout(() => {
                        if (!redirected) {
                            navigate("/login");
                            redirected = true;
                        }
                    }, 2200);
                }
            } else {
                setAuthError("Token ou usuário não encontrado nos parâmetros.");
                setLoading(false);
                setTimeout(() => {
                    if (!redirected) {
                        navigate("/login");
                        redirected = true;
                    }
                }, 2200);
            }
        }
        handleCallback();
        // eslint-disable-next-line
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
            <Zoom in>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 5,
                        boxShadow: "0 1.5px 16px rgba(0,0,0,0.06)",
                        border: "1.2px solid #e3e8ee",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        minWidth: 320,
                        maxWidth: 400,
                        background: "#fff",
                        transition: "box-shadow 0.14s, border 0.13s",
                        "&:hover": {
                            boxShadow: "0 3px 28px rgba(0,0,0,0.11)",
                            border: "1.7px solid #b0b8c9",
                        },
                    }}
                    aria-live="polite"
                >
                    <Fade in={loading}>
                        <Box>
                            <CircularProgress size={48} color="primary" />
                        </Box>
                    </Fade>
                    <Typography variant="h6" mt={2} sx={{ color: "primary.main", fontWeight: 700 }}>
                        {loading ? "Autenticando..." : authError ? "Falha na autenticação" : "Autenticado!"}
                    </Typography>
                    <Typography color="text.secondary" align="center">
                        {loading
                            ? "Aguarde, estamos conectando sua conta."
                            : authError
                                ? "Não foi possível autenticar. Você será redirecionado para o login."
                                : "Redirecionando para seu painel..."}
                    </Typography>
                    <Fade in={!!authError}>
                        <Box width="100%">
                            {authError && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {authError}
                                </Alert>
                            )}
                        </Box>
                    </Fade>
                </Paper>
            </Zoom>
        </Box>
    );
}