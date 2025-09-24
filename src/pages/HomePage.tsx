import { Box, Typography, Button, Paper, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // URLs do seu backend para autenticação social
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
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: { xs: 3, sm: 5 },
                    maxWidth: 430,
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: "0 4px 24px rgba(33,150,243,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Stack spacing={2} alignItems="center" width="100%">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 1,
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="CLT vs PJ"
                            style={{ width: 48, height: 48 }}
                        />
                        <Typography variant="h3" color="primary" fontWeight={700}>
                            CLT vs PJ
                        </Typography>
                    </Box>
                    <Divider sx={{ width: "100%" }} />
                    <Typography variant="h6" color="text.primary" align="center" fontWeight={600}>
                        Simule, compare e decida o melhor regime de trabalho para você.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                        Descubra qual modelo oferece maior salário líquido, benefícios e segurança financeira.
                        Compare CLT e PJ de forma rápida, visual e interativa!
                    </Typography>
                    <Stack spacing={2} sx={{ width: "100%" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            onClick={() => navigate("/simulacao")}
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                boxShadow: "none",
                                py: 1.5,
                            }}
                        >
                            Fazer Simulação Agora
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            fullWidth
                            onClick={() => navigate("/login")}
                            sx={{ fontWeight: 600, fontSize: "1.1rem", py: 1.5 }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                            fullWidth
                            onClick={() => navigate("/registro")}
                            sx={{ fontWeight: 600, fontSize: "1.1rem", py: 1.5 }}
                        >
                            Criar Conta
                        </Button>
                        <Divider sx={{ my: 1 }}>Ou acesse com</Divider>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            sx={{ fontWeight: 600, fontSize: "1.05rem", py: 1.2 }}
                            href={oauthGoogleUrl}
                        >
                            Google
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            fullWidth
                            startIcon={<GitHubIcon />}
                            sx={{ fontWeight: 600, fontSize: "1.05rem", py: 1.2 }}
                            href={oauthGithubUrl}
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
                                sx={{ fontWeight: 500, fontSize: "1.05rem", py: 1.2 }}
                            >
                                Ver Histórico de Simulações
                            </Button>
                        )}
                    </Stack>
                </Stack>
                <Divider sx={{ mt: 3, mb: 2 }} />
                <Typography variant="caption" color="text.secondary" align="center" display="block">
                    Projeto open-source • Feito com ♥ por ferrazsergio
                </Typography>
            </Paper>
        </Box>
    );
}