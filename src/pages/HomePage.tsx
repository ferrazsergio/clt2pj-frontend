import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Paper,
    Divider,
    Stack,
    Button,
    Container,
    CircularProgress,
    Fade,
    Zoom,
    Slide,
    alpha,
    styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
    Google as GoogleIcon, 
    GitHub as GitHubIcon,
    Calculate as CalculateIcon,
    Login as LoginIcon,
    PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";

// Botão estilo Apple
const AppleButton = styled(Button)(({ theme }) => ({
    borderRadius: 12,
    padding: "14px 28px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
    fontSize: "1.05rem",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "none",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.12)",
    },
    "&:active": {
        transform: "translateY(0)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
    },
}));

export default function HomePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [loadingSocial, setLoadingSocial] = useState<null | "google" | "github">(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const oauthGoogleUrl = "http://localhost:8080/oauth2/authorization/google";
    const oauthGithubUrl = "http://localhost:8080/oauth2/authorization/github";

    const handleSocialClick = (provider: "google" | "github") => {
        setLoadingSocial(provider);
        setTimeout(() => {
            window.location.href = provider === "google" ? oauthGoogleUrl : oauthGithubUrl;
        }, 600);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                background: "linear-gradient(180deg, #fafafa 0%, #f5f5f7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 3, md: 6 },
            }}
        >
            <Container maxWidth="sm">
                <Zoom in={mounted} timeout={600}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 4, md: 5 },
                            borderRadius: 4,
                            border: "1px solid #e5e5e7",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#ffffff",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
                                borderColor: "#d2d2d7",
                            },
                        }}
                    >
                        {/* Logo animado */}
                        <Fade in={mounted} timeout={800}>
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 3,
                                    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                                    animation: "float 3s ease-in-out infinite",
                                    "@keyframes float": {
                                        "0%, 100%": {
                                            transform: "translateY(0px)",
                                        },
                                        "50%": {
                                            transform: "translateY(-10px)",
                                        },
                                    },
                                }}
                            >
                                <CalculateIcon sx={{ fontSize: 40, color: "#ffffff" }} />
                            </Box>
                        </Fade>

                        {/* Título e subtítulo */}
                        <Slide direction="up" in={mounted} timeout={700}>
                            <Box sx={{ textAlign: "center", mb: 4 }}>
                                <Typography 
                                    variant="h3" 
                                    sx={{ 
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        fontWeight: 700,
                                        color: "#1d1d1f",
                                        mb: 1.5,
                                        letterSpacing: "-0.5px",
                                    }}
                                >
                                    CLT vs PJ
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        color: "#86868b",
                                        fontWeight: 400,
                                        maxWidth: 400,
                                        mx: "auto",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    Compare regimes de trabalho e descubra qual é o melhor para você
                                </Typography>
                            </Box>
                        </Slide>

                        {/* Ações principais */}
                        <Fade in={mounted} timeout={900} style={{ transitionDelay: mounted ? "200ms" : "0ms" }}>
                            <Stack spacing={2} sx={{ width: "100%", mb: 3 }}>
                                <AppleButton
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate("/simulacao")}
                                    startIcon={<CalculateIcon />}
                                    sx={{
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "#ffffff",
                                        py: 1.75,
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #5568d3 0%, #6a3f91 100%)",
                                        },
                                    }}
                                >
                                    Fazer Simulação
                                </AppleButton>
                                <AppleButton
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => navigate("/login")}
                                    startIcon={<LoginIcon />}
                                    sx={{
                                        borderColor: "#d2d2d7",
                                        color: "#1d1d1f",
                                        borderWidth: 1.5,
                                        "&:hover": {
                                            borderColor: "#86868b",
                                            backgroundColor: alpha("#1d1d1f", 0.04),
                                            borderWidth: 1.5,
                                        },
                                    }}
                                >
                                    Entrar
                                </AppleButton>
                                <AppleButton
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => navigate("/registro")}
                                    startIcon={<PersonAddIcon />}
                                    sx={{
                                        borderColor: "#d2d2d7",
                                        color: "#1d1d1f",
                                        borderWidth: 1.5,
                                        "&:hover": {
                                            borderColor: "#86868b",
                                            backgroundColor: alpha("#1d1d1f", 0.04),
                                            borderWidth: 1.5,
                                        },
                                    }}
                                >
                                    Criar Conta
                                </AppleButton>
                            </Stack>
                        </Fade>

                        {/* Divisor */}
                        <Divider sx={{ width: "100%", my: 3, borderColor: "#e5e5e7" }}>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: "#86868b",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    fontWeight: 500,
                                    px: 2,
                                }}
                            >
                                Ou acesse com
                            </Typography>
                        </Divider>

                        {/* Botões sociais */}
                        <Fade in={mounted} timeout={900} style={{ transitionDelay: mounted ? "400ms" : "0ms" }}>
                            <Stack spacing={2} sx={{ width: "100%" }}>
                                <AppleButton
                                    variant="outlined"
                                    fullWidth
                                    startIcon={loadingSocial === "google" ? null : <GoogleIcon />}
                                    onClick={() => handleSocialClick("google")}
                                    disabled={loadingSocial !== null}
                                    sx={{
                                        borderColor: "#d2d2d7",
                                        color: "#1d1d1f",
                                        borderWidth: 1.5,
                                        position: "relative",
                                        overflow: "hidden",
                                        "&:hover": {
                                            borderColor: "#4285F4",
                                            backgroundColor: alpha("#4285F4", 0.04),
                                            borderWidth: 1.5,
                                            boxShadow: `0 0 0 4px ${alpha("#4285F4", 0.1)}`,
                                        },
                                        "&.Mui-disabled": {
                                            borderColor: "#e5e5e7",
                                            color: "#86868b",
                                        },
                                    }}
                                >
                                    {loadingSocial === "google" ? (
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <CircularProgress size={20} sx={{ color: "#4285F4" }} />
                                            <span>Redirecionando...</span>
                                        </Box>
                                    ) : (
                                        "Continuar com Google"
                                    )}
                                </AppleButton>
                                <AppleButton
                                    variant="outlined"
                                    fullWidth
                                    startIcon={loadingSocial === "github" ? null : <GitHubIcon />}
                                    onClick={() => handleSocialClick("github")}
                                    disabled={loadingSocial !== null}
                                    sx={{
                                        borderColor: "#d2d2d7",
                                        color: "#1d1d1f",
                                        borderWidth: 1.5,
                                        "&:hover": {
                                            borderColor: "#24292F",
                                            backgroundColor: alpha("#24292F", 0.04),
                                            borderWidth: 1.5,
                                            boxShadow: `0 0 0 4px ${alpha("#24292F", 0.1)}`,
                                        },
                                        "&.Mui-disabled": {
                                            borderColor: "#e5e5e7",
                                            color: "#86868b",
                                        },
                                    }}
                                >
                                    {loadingSocial === "github" ? (
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <CircularProgress size={20} sx={{ color: "#24292F" }} />
                                            <span>Redirecionando...</span>
                                        </Box>
                                    ) : (
                                        "Continuar com GitHub"
                                    )}
                                </AppleButton>
                            </Stack>
                        </Fade>

                        {/* Footer */}
                        <Fade in={mounted} timeout={1000} style={{ transitionDelay: mounted ? "600ms" : "0ms" }}>
                            <Box sx={{ mt: 4, textAlign: "center" }}>
                                <Divider sx={{ mb: 3, borderColor: "#e5e5e7" }} />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "#86868b",
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        display: "block",
                                    }}
                                >
                                    Projeto open-source
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "#86868b",
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    }}
                                >
                                    Feito com dedicação por ferrazsergio
                                </Typography>
                            </Box>
                        </Fade>
                    </Paper>
                </Zoom>
            </Container>
        </Box>
    );
}