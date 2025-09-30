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
    Slide,
    Alert,
    Container,
    styled,
    alpha,
    Button
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

// Botão Apple-style (para consistência com outras páginas)
const AppleButton = styled(Button)(({ theme }) => ({
    borderRadius: 12,
    padding: "12px 24px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "none",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        transform: "translateY(-1px)",
    },
    "&:active": {
        transform: "translateY(0)",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
    },
}));

export default function OAuth2Callback() {
    const [mounted, setMounted] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginOAuth2 } = useAuth();

    const token = searchParams.get("token");
    const usuario = searchParams.get("usuario");
    const provider = searchParams.get("provider");

    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        let redirected = false;
        async function handleCallback() {
            if (token && usuario && provider) {
                try {
                    await loginOAuth2({
                        token,
                        usuario: { id: "", email: usuario, senha: "", papeis: [] },
                        provider
                    });                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        if (!redirected) {
                            navigate("/dashboard");
                            redirected = true;
                        }
                    }, 1200);
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

    const getProviderName = (provider: string | null) => {
        switch (provider) {
            case 'google': return 'Google';
            case 'github': return 'GitHub';
            default: return 'provedor';
        }
    };

    const getProviderColor = (provider: string | null) => {
        switch (provider) {
            case 'google': return '#4285F4';
            case 'github': return '#24292F';
            default: return '#667eea';
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                bgcolor: "#fafafa",
                py: { xs: 3, md: 6 },
            }}
        >
            <Container maxWidth="sm">
                <Slide direction="down" in={mounted} timeout={500}>
                    <Box sx={{ mb: 4 }}>
                        {/* Espaço reservado para manter consistência com outras páginas */}
                    </Box>
                </Slide>

                <Zoom in={mounted} timeout={600}>
                    <Paper 
                        elevation={0}
                        sx={{
                            p: { xs: 4, md: 5 },
                            maxWidth: 440,
                            mx: "auto",
                            borderRadius: 4,
                            border: "1px solid #e5e5e7",
                            backgroundColor: "#ffffff",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
                                borderColor: "#d2d2d7",
                            },
                        }}
                        aria-live="polite"
                    >
                        {/* Ícone de Status */}
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    background: loading 
                                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                        : success
                                        ? "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)"
                                        : "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mx: "auto",
                                    mb: 2,
                                    boxShadow: loading 
                                        ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                                        : success
                                        ? "0 4px 12px rgba(76, 175, 80, 0.3)"
                                        : "0 4px 12px rgba(255, 107, 107, 0.3)",
                                }}
                            >
                                {loading ? (
                                    <CircularProgress 
                                        size={40} 
                                        sx={{ color: "#ffffff" }} 
                                    />
                                ) : success ? (
                                    <CheckCircleIcon sx={{ fontSize: 40, color: "#ffffff" }} />
                                ) : (
                                    <ErrorIcon sx={{ fontSize: 40, color: "#ffffff" }} />
                                )}
                            </Box>
                        </Box>

                        {/* Título e Descrição */}
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    fontWeight: 700,
                                    color: "#1d1d1f",
                                    mb: 1,
                                }}
                            >
                                {loading 
                                    ? "Conectando..." 
                                    : success 
                                    ? "Conectado!" 
                                    : "Falha na conexão"}
                            </Typography>
                            
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: "#86868b",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    lineHeight: 1.6,
                                }}
                            >
                                {loading ? (
                                    <>Conectando sua conta <strong>{getProviderName(provider)}</strong>. Aguarde um momento...</>
                                ) : success ? (
                                    <>Sua conta <strong>{getProviderName(provider)}</strong> foi conectada com sucesso!</>
                                ) : (
                                    <>Não foi possível conectar sua conta <strong>{getProviderName(provider)}</strong>.</>
                                )}
                            </Typography>
                        </Box>

                        {/* Status Indicator */}
                        <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            gap: 1,
                            mb: 3 
                        }}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: loading ? "#667eea" : success ? "#4CAF50" : "#ff6b6b",
                                }}
                            />
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: "#86868b",
                                    fontWeight: 600,
                                }}
                            >
                                {loading ? "Processando..." : success ? "Concluído" : "Erro"}
                            </Typography>
                        </Box>

                        {/* Alertas de erro */}
                        {authError && (
                            <Fade in timeout={300}>
                                <Alert 
                                    severity="error"
                                    sx={{ 
                                        borderRadius: 3,
                                        "& .MuiAlert-icon": {
                                            fontSize: 24,
                                        }
                                    }}
                                >
                                    {authError}
                                </Alert>
                            </Fade>
                        )}

                        {/* Informações adicionais */}
                        <Fade in={!loading} timeout={500}>
                            <Box sx={{ mt: 3 }}>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        backgroundColor: "#f5f5f7",
                                        border: "1px solid #e5e5e7",
                                    }}
                                >
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: "#86868b",
                                            fontWeight: 600,
                                            display: "block",
                                            mb: 1,
                                        }}
                                    >
                                        Provedor
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                backgroundColor: getProviderColor(provider),
                                            }}
                                        />
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: "#1d1d1f",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {getProviderName(provider)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>

                        {/* Botão de ação (apenas em caso de erro) */}
                        {authError && (
                            <Fade in timeout={600}>
                                <Box sx={{ mt: 3 }}>
                                    <AppleButton
                                        variant="outlined"
                                        fullWidth
                                        onClick={() => navigate("/login")}
                                        sx={{
                                            borderColor: "#d2d2d7",
                                            color: "#1d1d1f",
                                            "&:hover": {
                                                borderColor: "#86868b",
                                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                            },
                                        }}
                                    >
                                        Voltar para o Login
                                    </AppleButton>
                                </Box>
                            </Fade>
                        )}
                    </Paper>
                </Zoom>
            </Container>
        </Box>
    );
}