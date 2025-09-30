import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Stack,
    Divider,
    Container,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
    Fade,
    Zoom,
    Tooltip,
    styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Fix autofill background black (Chrome/Edge/Safari)
const StyledTextField = styled(TextField)(({ theme }) => ({
    "& input, & .MuiInputBase-input": {
        background: "#fff !important",
        WebkitBoxShadow: "0 0 0 100px #fff inset !important",
        boxShadow: "0 0 0 100px #fff inset !important",
        WebkitTextFillColor: "#1d1d1f !important",
        color: "#1d1d1f",
        borderRadius: 12,
        fontFamily: "'SF Pro Display', 'Inter', 'Roboto', 'Arial', sans-serif"
    },
    "&:-webkit-autofill": {
        background: "#fff !important",
        WebkitBoxShadow: "0 0 0 100px #fff inset !important",
        boxShadow: "0 0 0 100px #fff inset !important",
        WebkitTextFillColor: "#1d1d1f !important",
        color: "#1d1d1f !important",
        borderRadius: 12,
    },
    background: "#fff",
    borderRadius: 12,
}));

function isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isSenhaValid(senha: string) {
    return senha.length >= 6;
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingSocial, setLoadingSocial] = useState<null | "google" | "github">(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const oauthGoogleUrl = "http://localhost:8080/oauth2/authorization/google";
    const oauthGithubUrl = "http://localhost:8080/oauth2/authorization/github";

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            if (!isEmailValid(email)) {
                setError("Digite um e-mail válido.");
                setLoading(false);
                return;
            }
            if (!isSenhaValid(senha)) {
                setError("Senha deve ter pelo menos 6 caracteres.");
                setLoading(false);
                return;
            }
            await login({ email, senha });
            navigate("/dashboard");
        } catch {
            setError("Erro ao fazer login. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialClick = (provider: "google" | "github") => {
        setLoadingSocial(provider);
        setTimeout(() => {
            window.location.href = provider === "google" ? oauthGoogleUrl : oauthGithubUrl;
        }, 900);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(s => !s);
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
                <Fade in>
                    <Box sx={{ mb: 3 }}>
                        <Tooltip title="Voltar" arrow>
                            <span>
                                <Button
                                    startIcon={<ArrowBackIcon />}
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleBack}
                                    sx={{
                                        fontWeight: 600,
                                        textTransform: "none",
                                        borderRadius: 3,
                                        background: "#fff",
                                        border: "1.5px solid #e3e8ee",
                                        boxShadow: "none",
                                        color: "primary.main",
                                        transition: "background 0.14s, box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                                        "&:hover": {
                                            background: "#f5f5f7",
                                            borderColor: "#b0b8c9",
                                            color: "primary.main",
                                            boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                                            transform: "scale(1.01)",
                                        },
                                    }}
                                    disabled={loading || loadingSocial !== null}
                                >
                                    Voltar
                                </Button>
                            </span>
                        </Tooltip>
                    </Box>
                </Fade>

                <Zoom in>
                    <Paper
                        elevation={3}
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 5,
                            boxShadow: "0 1.5px 16px rgba(0,0,0,0.06)",
                            border: "1.2px solid #e3e8ee",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: 430,
                            mx: "auto",
                            minHeight: { xs: 430, md: 0 },
                            background: "#fff",
                            transition: "box-shadow 0.14s, border 0.13s",
                            "&:hover": {
                                boxShadow: "0 3px 28px rgba(0,0,0,0.11)",
                                border: "1.7px solid #b0b8c9",
                            },
                        }}
                    >
                        {/* Header */}
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                bgcolor: "background.default",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 2,
                            }}
                        >
                            <LoginIcon sx={{ fontSize: 32, color: "primary.main" }} />
                        </Box>
                        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 700, color: "primary.main" }}>
                            Bem-vindo de volta
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                            Entre com suas credenciais para continuar
                        </Typography>

                        {/* Formulário */}
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            display="flex"
                            flexDirection="column"
                            gap={2.5}
                            width="100%"
                            autoComplete="off"
                        >
                            <StyledTextField
                                label="E-mail"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                fullWidth
                                disabled={loading || loadingSocial !== null}
                                placeholder="seu@email.com"
                                autoFocus
                                error={!!error && !isEmailValid(email)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                helperText={
                                    <span>
                                        {!isEmailValid(email) && email.length > 0 && (
                                            <Typography color="error" variant="caption">
                                                Email inválido.
                                            </Typography>
                                        )}
                                    </span>
                                }
                            />
                            <StyledTextField
                                label="Senha"
                                type={showPassword ? "text" : "password"}
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                required
                                fullWidth
                                disabled={loading || loadingSocial !== null}
                                placeholder="Digite sua senha"
                                error={!!error && !isSenhaValid(senha)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Tooltip title={showPassword ? "Ocultar senha" : "Mostrar senha"} arrow>
                                                <span>
                                                    <IconButton
                                                        onClick={togglePasswordVisibility}
                                                        edge="end"
                                                        disabled={loading || loadingSocial !== null}
                                                        aria-label="toggle password visibility"
                                                        size="small"
                                                    >
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </InputAdornment>
                                    ),
                                }}
                                helperText={
                                    <span>
                                        {!isSenhaValid(senha) && senha.length > 0 && (
                                            <Typography color="error" variant="caption">
                                                Mínimo 6 caracteres
                                            </Typography>
                                        )}
                                    </span>
                                }
                            />
                            <Fade in={!!error}>
                                <Box>
                                    {error && (
                                        <Alert severity="error" sx={{ width: "100%" }}>
                                            {error}
                                        </Alert>
                                    )}
                                </Box>
                            </Fade>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                disabled={
                                    loading ||
                                    loadingSocial !== null ||
                                    !isEmailValid(email) ||
                                    !isSenhaValid(senha)
                                }
                                sx={{
                                    mt: 1,
                                    py: 1.5,
                                    fontWeight: 600,
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
                                    },
                                    "&.Mui-disabled": {
                                        background: "#f5f5f7",
                                        color: "#b0b8c9",
                                        borderColor: "#e3e8ee",
                                        cursor: "not-allowed",
                                    },
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Entrar"
                                )}
                            </Button>
                        </Box>

                        {/* Divider */}
                        <Divider sx={{ my: 3, width: "100%", background: "#e3e8ee" }}>
                            <Typography variant="body2" color="text.secondary">
                                Ou entre com
                            </Typography>
                        </Divider>

                        {/* OAuth Buttons */}
                        <Zoom in>
                            <Stack spacing={2} width="100%">
                                <Tooltip title="Login seguro via Google" arrow>
                                    <span>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            fullWidth
                                            size="large"
                                            startIcon={
                                                <GoogleIcon
                                                    sx={{
                                                        transition: "transform 0.2s",
                                                        ...(loadingSocial === "google" && { animation: "spin 1s linear infinite" })
                                                    }}
                                                />
                                            }
                                            sx={{
                                                py: 1.2,
                                                fontWeight: 600,
                                                textTransform: "none",
                                                borderWidth: 2,
                                                borderRadius: 3,
                                                background: "#fff",
                                                color: "primary.main",
                                                border: "1.5px solid #e3e8ee",
                                                transition: "box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                                                "&:hover": {
                                                    boxShadow: "0 0 8px 2px #4285F4",
                                                    transform: "scale(1.02)",
                                                    borderColor: "#b0b8c9",
                                                }
                                            }}
                                            disabled={loading || loadingSocial !== null}
                                            onClick={() => handleSocialClick("google")}
                                        >
                                            {loadingSocial === "google" ? (
                                                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                    <CircularProgress size={20} color="primary" />
                                                    Redirecionando...
                                                </Box>
                                            ) : (
                                                "Continuar com Google"
                                            )}
                                        </Button>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Entrar com GitHub" arrow>
                                    <span>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            fullWidth
                                            size="large"
                                            startIcon={
                                                <GitHubIcon
                                                    sx={{
                                                        transition: "transform 0.2s",
                                                        ...(loadingSocial === "github" && { animation: "spin 1s linear infinite" })
                                                    }}
                                                />
                                            }
                                            sx={{
                                                py: 1.2,
                                                fontWeight: 600,
                                                textTransform: "none",
                                                borderWidth: 2,
                                                borderRadius: 3,
                                                background: "#fff",
                                                color: "primary.main",
                                                border: "1.5px solid #e3e8ee",
                                                transition: "box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                                                "&:hover": {
                                                    boxShadow: "0 0 8px 2px #24292F",
                                                    transform: "scale(1.02)",
                                                    borderColor: "#b0b8c9",
                                                }
                                            }}
                                            disabled={loading || loadingSocial !== null}
                                            onClick={() => handleSocialClick("github")}
                                        >
                                            {loadingSocial === "github" ? (
                                                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                    <CircularProgress size={20} color="inherit" />
                                                    Redirecionando...
                                                </Box>
                                            ) : (
                                                "Continuar com GitHub"
                                            )}
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Stack>
                        </Zoom>

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
                                    Não tem conta?
                                </Typography>
                                <Button
                                    variant="text"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        fontWeight: 600,
                                        textTransform: "none",
                                        fontSize: "1em",
                                        minWidth: "unset",
                                        px: 1.5,
                                        py: 0.2,
                                        borderRadius: "8px",
                                        lineHeight: 1.2
                                    }}
                                    onClick={() => navigate("/registro")}
                                    disabled={loading || loadingSocial !== null}
                                >
                                    Registrar
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Zoom>
            </Container>
            {/* Keyframes para animação de ícone */}
            <style>
                {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
            </style>
        </Box>
    );
}