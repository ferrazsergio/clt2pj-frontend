import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Stack,
    Divider,
    CircularProgress,
    Container,
    InputAdornment,
    IconButton,
    Alert
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const oauthGoogleUrl = "http://localhost:8080/oauth2/authorization/google";
    const oauthGithubUrl = "http://localhost:8080/oauth2/authorization/github";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register({ email, senha });
            // login automático após registro
            await login({ email, senha });
            // redireciona para o dashboard
            navigate("/dashboard");
        } catch (err: unknown) {
            const error = err as { response?: { status?: number; data?: unknown } };
            if (error?.response?.status === 409) {
                setError("Este e-mail já está cadastrado. Tente outro ou faça login.");
            } else if (error?.response?.data) {
                setError(String(error.response.data));
            } else {
                setError("Erro ao registrar ou logar. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                py: { xs: 3, md: 6 }
            }}
        >
            <Container maxWidth="sm">
                {/* Botão Voltar */}
                <Box sx={{ mb: 3 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="text"
                        color="primary"
                        onClick={() => navigate(-1)}
                        sx={{ fontWeight: 600, textTransform: "none" }}
                        disabled={loading}
                    >
                        Voltar
                    </Button>
                </Box>

                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: 3,
                        boxShadow: "0 4px 24px rgba(33,150,243,0.12)",
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
                            bgcolor: "primary.light",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 2
                        }}
                    >
                        <PersonAddIcon sx={{ fontSize: 32, color: "primary.main" }} />
                    </Box>
                    <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600 }}>
                        Criar Conta
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                        Preencha os dados abaixo para começar
                    </Typography>

                    {/* Formulário */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        display="flex"
                        flexDirection="column"
                        gap={2.5}
                        width="100%"
                    >
                        <TextField
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            fullWidth
                            disabled={loading}
                            placeholder="seu@email.com"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Senha"
                            type={showPassword ? "text" : "password"}
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            required
                            fullWidth
                            disabled={loading}
                            placeholder="Mínimo 6 caracteres"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                            disabled={loading}
                                            aria-label="toggle password visibility"
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {error && (
                            <Alert severity="error" sx={{ width: "100%" }}>
                                {error}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            disabled={loading}
                            sx={{ mt: 1, py: 1.5, fontWeight: 600 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Registrar"
                            )}
                        </Button>
                    </Box>

                    {/* Divider */}
                    <Divider sx={{ my: 3, width: "100%" }}>
                        <Typography variant="body2" color="text.secondary">
                            Ou cadastre-se com
                        </Typography>
                    </Divider>

                    {/* OAuth Buttons */}
                    <Stack spacing={2} width="100%">
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            size="large"
                            startIcon={<GoogleIcon />}
                            href={oauthGoogleUrl}
                            disabled={loading}
                            sx={{
                                py: 1.2,
                                fontWeight: 600,
                                textTransform: "none",
                                borderWidth: 2,
                                "&:hover": {
                                    borderWidth: 2,
                                }
                            }}
                        >
                            Continuar com Google
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            size="large"
                            startIcon={<GitHubIcon />}
                            href={oauthGithubUrl}
                            disabled={loading}
                            sx={{
                                py: 1.2,
                                fontWeight: 600,
                                textTransform: "none",
                                borderWidth: 2,
                                "&:hover": {
                                    borderWidth: 2,
                                }
                            }}
                        >
                            Continuar com GitHub
                        </Button>
                    </Stack>

                    {/* Footer */}
                    <Box
                        sx={{
                            mt: 3,
                            pt: 3,
                            borderTop: "1px solid",
                            borderColor: "divider",
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
                            <Typography variant="body2" color="text.secondary">
                                Já tem conta?
                            </Typography>
                            <Button
                                variant="text"
                                color="primary"
                                size="small"
                                sx={{ fontWeight: 600, textTransform: "none" }}
                                onClick={() => navigate("/login")}
                                disabled={loading}
                            >
                                Entrar
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}