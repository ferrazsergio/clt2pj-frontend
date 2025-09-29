import React from "react";
import {
    Box,
    Typography,
    Paper,
    Divider,
    Stack,
    Button,
    Container,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const theme = useTheme();

    // URLs do backend para autenticação social
    const oauthGoogleUrl = "http://localhost:8080/oauth2/authorization/google";
    const oauthGithubUrl = "http://localhost:8080/oauth2/authorization/github";

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
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={4}
                    sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: 3,
                        boxShadow: "0 4px 24px rgba(33,150,243,0.11)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            bgcolor: theme.palette.primary.light,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 2,
                        }}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="CLT vs PJ Logo"
                            style={{ width: 40, height: 40, borderRadius: "50%" }}
                        />
                    </Box>
                    <Typography variant="h4" align="center" fontWeight={700} color="primary" gutterBottom>
                        CLT vs PJ
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
                        Simule, compare e descubra o melhor regime de trabalho para você.
                    </Typography>

                    {/* Main Actions */}
                    <Stack spacing={2} sx={{ width: "100%", mb: 2 }}>
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
                                borderRadius: 2,
                                boxShadow: "none",
                            }}
                        >
                            Fazer Simulação
                        </Button>
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
                                borderRadius: 2,
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                            fullWidth
                            onClick={() => navigate("/registro")}
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.05rem",
                                py: 1.5,
                                borderRadius: 2,
                            }}
                        >
                            Criar Conta
                        </Button>
                    </Stack>

                    {/* Divider / Social Login */}
                    <Divider sx={{ my: 2, width: "100%" }}>
                        <Typography variant="body2" color="text.secondary">
                            Ou acesse com
                        </Typography>
                    </Divider>

                    <Stack spacing={2} sx={{ width: "100%" }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            href={oauthGoogleUrl}
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.05rem",
                                py: 1.2,
                                borderRadius: 2,
                                borderWidth: 2,
                                textTransform: "none",
                                "&:hover": {
                                    borderWidth: 2,
                                }
                            }}
                        >
                            Google
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            fullWidth
                            startIcon={<GitHubIcon />}
                            href={oauthGithubUrl}
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.05rem",
                                py: 1.2,
                                borderRadius: 2,
                                borderWidth: 2,
                                textTransform: "none",
                                "&:hover": {
                                    borderWidth: 2,
                                }
                            }}
                        >
                            GitHub
                        </Button>
                        {user && (
                            <Button
                                variant="text"
                                color="primary"
                                size="large"
                                fullWidth
                                onClick={() => navigate("/historico")}
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "1.05rem",
                                    py: 1.2,
                                    borderRadius: 2,
                                }}
                            >
                                Ver Histórico de Simulações
                            </Button>
                        )}
                    </Stack>

                    {/* Footer */}
                    <Divider sx={{ mt: 3, mb: 2, width: "100%" }} />
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
            </Container>
        </Box>
    );
}