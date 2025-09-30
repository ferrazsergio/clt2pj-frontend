import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Divider,
    Stack,
    Button,
    Container,
    useTheme,
    Tooltip,
    Zoom,
    Fade,
    CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const theme = useTheme();

    // Social login animation state
    const [loadingSocial, setLoadingSocial] = useState<null | "google" | "github">(null);

    // URLs do backend para autenticação social
    const oauthGoogleUrl = "http://localhost:8080/oauth2/authorization/google";
    const oauthGithubUrl = "http://localhost:8080/oauth2/authorization/github";

    // Social login with animation
    const handleSocialClick = (provider: "google" | "github") => {
        setLoadingSocial(provider);
        setTimeout(() => {
            window.location.href = provider === "google" ? oauthGoogleUrl : oauthGithubUrl;
        }, 900);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                bgcolor: "background.default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 3, md: 6 },
                transition: "background 0.3s"
            }}
        >
            <Container maxWidth="sm">
                <Zoom in>
                    <Paper
                        elevation={4}
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 5,
                            boxShadow: "0 1.5px 16px rgba(0,0,0,0.06)",
                            border: "1.2px solid #e3e8ee",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            background: "#fff",
                            transition: "box-shadow 0.14s, border 0.13s",
                            "&:hover": {
                                boxShadow: "0 3px 28px rgba(0,0,0,0.11)",
                                border: "1.7px solid #b0b8c9",
                            },
                        }}
                    >
                        {/* Header */}
                        <Fade in>
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: "50%",
                                    bgcolor: theme.palette.background.default,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 2,
                                    boxShadow: 1,
                                }}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    alt="CLT vs PJ Logo"
                                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                                />
                            </Box>
                        </Fade>
                        <Typography variant="h4" align="center" fontWeight={700} color="primary.main" gutterBottom>
                            CLT vs PJ
                        </Typography>
                        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
                            Simule, compare e descubra o melhor regime de trabalho para você.
                        </Typography>

                        {/* Main Actions */}
                        <Stack spacing={2} sx={{ width: "100%", mb: 2 }}>
                            <Tooltip title="Compare regimes e descubra o melhor para você!" arrow>
                                <span>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        onClick={() => navigate("/simulacao")}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "1.05rem",
                                            py: 1.5,
                                            borderRadius: "14px",
                                            boxShadow: "none",
                                            background: "#fff",
                                            color: "primary.main",
                                            border: "1.5px solid #e3e8ee",
                                            transition: "background 0.14s, box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                                            "&:hover": {
                                                background: "#f5f5f7",
                                                borderColor: "#b0b8c9",
                                                color: "primary.main",
                                                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                                                transform: "scale(1.01)",
                                            },
                                            "&:active": {
                                                background: "#e8e8ed",
                                                color: "primary.main",
                                                borderColor: "#b0b8c9",
                                            }
                                        }}
                                    >
                                        Fazer Simulação
                                    </Button>
                                </span>
                            </Tooltip>
                            <Tooltip title="Faça login para acessar o histórico e recursos avançados" arrow>
                                <span>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        onClick={() => navigate("/login")}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "1.05rem",
                                            py: 1.5,
                                            borderRadius: "14px",
                                            background: "#fff",
                                            color: "primary.main",
                                            border: "1.5px solid #e3e8ee",
                                            transition: "background 0.14s, box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                                            boxShadow: "none",
                                            "&:hover": {
                                                background: "#f5f5f7",
                                                borderColor: "#b0b8c9",
                                                color: "primary.main",
                                                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                                                transform: "scale(1.01)",
                                            },
                                            "&:active": {
                                                background: "#e8e8ed",
                                                color: "primary.main",
                                                borderColor: "#b0b8c9",
                                            }
                                        }}
                                    >
                                        Login
                                    </Button>
                                </span>
                            </Tooltip>
                            <Tooltip title="Crie sua conta e aproveite todos os recursos!" arrow>
                                <span>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        onClick={() => navigate("/registro")}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "1.05rem",
                                            py: 1.5,
                                            borderRadius: "14px",
                                            background: "#fff",
                                            color: "primary.main",
                                            border: "1.5px solid #e3e8ee",
                                            transition: "background 0.14s, box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                                            boxShadow: "none",
                                            "&:hover": {
                                                background: "#f5f5f7",
                                                borderColor: "#b0b8c9",
                                                color: "primary.main",
                                                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                                                transform: "scale(1.01)",
                                            },
                                            "&:active": {
                                                background: "#e8e8ed",
                                                color: "primary.main",
                                                borderColor: "#b0b8c9",
                                            }
                                        }}
                                    >
                                        Criar Conta
                                    </Button>
                                </span>
                            </Tooltip>
                        </Stack>

                        {/* Divider / Social Login */}
                        <Divider sx={{ my: 2, width: "100%", background: "#e3e8ee" }}>
                            <Typography variant="body2" color="text.secondary">
                                Ou acesse com
                            </Typography>
                        </Divider>

                        <Zoom in>
                            <Stack spacing={2} sx={{ width: "100%" }}>
                                <Tooltip title="Login seguro via Google" arrow>
                                    <span>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="large"
                                            fullWidth
                                            startIcon={
                                                <GoogleIcon
                                                    sx={{
                                                        transition: "transform 0.2s",
                                                        ...(loadingSocial === "google" && { animation: "spin 1s linear infinite" })
                                                    }}
                                                />
                                            }
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: "1.05rem",
                                                py: 1.2,
                                                borderRadius: "14px",
                                                background: "#fff",
                                                color: "primary.main",
                                                border: "1.5px solid #e3e8ee",
                                                transition: "box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                                                boxShadow: "none",
                                                "&:hover": {
                                                    boxShadow: "0 0 8px 2px #4285F4",
                                                    transform: "scale(1.02)",
                                                    borderColor: "#b0b8c9",
                                                }
                                            }}
                                            disabled={loadingSocial !== null}
                                            onClick={() => handleSocialClick("google")}
                                        >
                                            {loadingSocial === "google" ? (
                                                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                    <CircularProgress size={20} color="primary" />
                                                    Redirecionando...
                                                </Box>
                                            ) : (
                                                "Google"
                                            )}
                                        </Button>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Entrar com GitHub" arrow>
                                    <span>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="large"
                                            fullWidth
                                            startIcon={
                                                <GitHubIcon
                                                    sx={{
                                                        transition: "transform 0.2s",
                                                        ...(loadingSocial === "github" && { animation: "spin 1s linear infinite" })
                                                    }}
                                                />
                                            }
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: "1.05rem",
                                                py: 1.2,
                                                borderRadius: "14px",
                                                background: "#fff",
                                                color: "primary.main",
                                                border: "1.5px solid #e3e8ee",
                                                transition: "box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                                                boxShadow: "none",
                                                "&:hover": {
                                                    boxShadow: "0 0 8px 2px #24292F",
                                                    transform: "scale(1.02)",
                                                    borderColor: "#b0b8c9",
                                                }
                                            }}
                                            disabled={loadingSocial !== null}
                                            onClick={() => handleSocialClick("github")}
                                        >
                                            {loadingSocial === "github" ? (
                                                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                    <CircularProgress size={20} color="inherit" />
                                                    Redirecionando...
                                                </Box>
                                            ) : (
                                                "GitHub"
                                            )}
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Stack>
                        </Zoom>

                        {/* Footer */}
                        <Divider sx={{ mt: 3, mb: 2, width: "100%", background: "#e3e8ee" }} />
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            align="center"
                            display="block"
                            sx={{ mt: 1 }}
                        >
                            Projeto open-source • Feito com ♥ por ferrazsergio
                        </Typography>
                    </Paper>
                </Zoom>
            </Container>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </Box>
    );
}