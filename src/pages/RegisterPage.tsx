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
    Alert,
    Tooltip,
    Fade,
    Zoom,
    Slide,
    styled,
    alpha,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InfoIcon from "@mui/icons-material/Info";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Apple-style TextField com correção para autofill
const AppleTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 12,
        backgroundColor: "#ffffff",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            backgroundColor: "#fafafa",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha(theme.palette.primary.main, 0.3),
            },
        },
        "&.Mui-focused": {
            backgroundColor: "#ffffff",
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
            },
        },
        "& input": {
            background: "#fff !important",
            WebkitBoxShadow: "0 0 0 100px #fff inset !important",
            boxShadow: "0 0 0 100px #fff inset !important",
            WebkitTextFillColor: "#1d1d1f !important",
            color: "#1d1d1f",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
            fontSize: "1rem",
            fontWeight: 400,
        },
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#d2d2d7",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "& .MuiInputLabel-root": {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
        fontWeight: 500,
    },
}));

// Botão Apple-style
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

function isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSenhaValid(senha: string) {
    return senha.length >= 6;
}

export default function RegisterPage() {
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loadingSocial, setLoadingSocial] = useState<null | "google" | "github">(null);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const oauthGoogleUrl = "http://localhost:8080/oauth2/authorization/google";
    const oauthGithubUrl = "http://localhost:8080/oauth2/authorization/github";

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    React.useEffect(() => {
        if (success) setSuccess(false);
        // eslint-disable-next-line
    }, [email, senha]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
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
            await register({ email, senha });
            await login({ email, senha });
            setSuccess(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 1200);
        } catch (err: any) {
            if (!window.navigator.onLine) {
                setError("Sem conexão com a internet.");
            } else {
                const errorObj = err as { response?: { status?: number; data?: any } };
                if (errorObj?.response?.status === 409) {
                    setError("Este e-mail já está cadastrado. Tente outro ou faça login.");
                } else if (typeof errorObj?.response?.data === "string") {
                    setError(errorObj.response.data);
                } else {
                    setError("Erro ao registrar ou logar. Tente novamente.");
                }
            }
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
        setShowPassword((s) => !s);
    };

    const isFormValid = isEmailValid(email) && isSenhaValid(senha);

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
                {/* Header com botão voltar */}
                <Slide direction="down" in={mounted} timeout={500}>
                    <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 2,
                        mb: 4 
                    }}>
                        <Tooltip title="Voltar" arrow placement="bottom">
                            <span>
                                <AppleButton
                                    startIcon={<ArrowBackIcon />}
                                    variant="outlined"
                                    onClick={handleBack}
                                    disabled={loading || loadingSocial !== null}
                                    sx={{
                                        borderColor: "#d2d2d7",
                                        color: "#1d1d1f",
                                        "&:hover": {
                                            borderColor: "#86868b",
                                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        },
                                    }}
                                >
                                    Voltar
                                </AppleButton>
                            </span>
                        </Tooltip>
                    </Box>
                </Slide>

                {/* Card principal do registro */}
                <Zoom in={mounted} timeout={600}>
                    <Paper 
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
                            maxWidth: 480,
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
                    >
                        {/* Ícone e Título */}
                        <Box sx={{ textAlign: "center", mb: 4 }}>
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mx: "auto",
                                    mb: 2,
                                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                                }}
                            >
                                <PersonAddIcon sx={{ fontSize: 32, color: "#ffffff" }} />
                            </Box>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    fontWeight: 700,
                                    color: "#1d1d1f",
                                    mb: 1,
                                }}
                            >
                                Criar Conta
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: "#86868b",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                }}
                            >
                                Preencha os dados abaixo para começar
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                        >
                            {/* Campo Email */}
                            <AppleTextField
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
                                            <EmailIcon sx={{ color: "#86868b" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                helperText={
                                    !isEmailValid(email) && email.length > 0 
                                        ? "Digite um e-mail válido" 
                                        : ""
                                }
                            />

                            {/* Campo Senha */}
                            <AppleTextField
                                label="Senha"
                                type={showPassword ? "text" : "password"}
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                required
                                fullWidth
                                disabled={loading || loadingSocial !== null}
                                placeholder="Mínimo 6 caracteres"
                                error={!!error && !isSenhaValid(senha)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon sx={{ color: "#86868b" }} />
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
                                                        sx={{
                                                            color: "#86868b",
                                                            "&:hover": {
                                                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                            },
                                                        }}
                                                    >
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </InputAdornment>
                                    ),
                                }}
                                helperText={
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#86868b" }}>
                                        <InfoIcon fontSize="small" />
                                        <Typography variant="caption">
                                            Mínimo 6 caracteres
                                        </Typography>
                                    </Box>
                                }
                            />

                            {/* Alertas de erro e sucesso */}
                            {error && (
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
                                        {error}
                                    </Alert>
                                </Fade>
                            )}
                            
                            {success && (
                                <Fade in timeout={300}>
                                    <Alert 
                                        severity="success"
                                        sx={{ 
                                            borderRadius: 3,
                                            "& .MuiAlert-icon": {
                                                fontSize: 24,
                                            }
                                        }}
                                    >
                                        Conta criada com sucesso! Redirecionando...
                                    </Alert>
                                </Fade>
                            )}

                            {/* Botão de submit */}
                            <AppleButton
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading || loadingSocial !== null || !isFormValid}
                                sx={{
                                    mt: 2,
                                    py: 1.75,
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    color: "#ffffff",
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #5568d3 0%, #6a3f91 100%)",
                                    },
                                    "&.Mui-disabled": {
                                        background: "#e5e5e7",
                                        color: "#86868b",
                                    },
                                }}
                            >
                                {loading ? (
                                    <Box display="flex" alignItems="center" gap={1.5}>
                                        <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                                        <span>Criando conta...</span>
                                    </Box>
                                ) : (
                                    "Registrar"
                                )}
                            </AppleButton>
                        </Box>

                        {/* Divisor elegante */}
                        <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 2,
                            my: 4,
                        }}>
                            <Divider sx={{ flex: 1, borderColor: "#e5e5e7" }} />
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: "#86868b",
                                    fontWeight: 600,
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 2,
                                    bgcolor: "#f5f5f7",
                                }}
                            >
                                Ou cadastre-se com
                            </Typography>
                            <Divider sx={{ flex: 1, borderColor: "#e5e5e7" }} />
                        </Box>

                        {/* Botões OAuth */}
                        <Stack spacing={2} width="100%">
                            <Tooltip title="Cadastro seguro via Google" arrow placement="top">
                                <span>
                                    <AppleButton
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        startIcon={
                                            <GoogleIcon
                                                sx={{
                                                    transition: "transform 0.2s",
                                                    ...(loadingSocial === "google" && { 
                                                        animation: "spin 1s linear infinite" 
                                                    })
                                                }}
                                            />
                                        }
                                        disabled={loading || loadingSocial !== null}
                                        onClick={() => handleSocialClick("google")}
                                        sx={{
                                            borderColor: "#d2d2d7",
                                            color: "#1d1d1f",
                                            "&:hover": {
                                                borderColor: "#86868b",
                                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                            },
                                        }}
                                    >
                                        {loadingSocial === "google" ? (
                                            <Box display="flex" alignItems="center" gap={1.5}>
                                                <CircularProgress size={20} sx={{ color: "#1d1d1f" }} />
                                                <span>Redirecionando...</span>
                                            </Box>
                                        ) : (
                                            "Continuar com Google"
                                        )}
                                    </AppleButton>
                                </span>
                            </Tooltip>

                            <Tooltip title="Cadastro com GitHub" arrow placement="bottom">
                                <span>
                                    <AppleButton
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        startIcon={
                                            <GitHubIcon
                                                sx={{
                                                    transition: "transform 0.2s",
                                                    ...(loadingSocial === "github" && { 
                                                        animation: "spin 1s linear infinite" 
                                                    })
                                                }}
                                            />
                                        }
                                        disabled={loading || loadingSocial !== null}
                                        onClick={() => handleSocialClick("github")}
                                        sx={{
                                            borderColor: "#d2d2d7",
                                            color: "#1d1d1f",
                                            "&:hover": {
                                                borderColor: "#86868b",
                                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                            },
                                        }}
                                    >
                                        {loadingSocial === "github" ? (
                                            <Box display="flex" alignItems="center" gap={1.5}>
                                                <CircularProgress size={20} sx={{ color: "#1d1d1f" }} />
                                                <span>Redirecionando...</span>
                                            </Box>
                                        ) : (
                                            "Continuar com GitHub"
                                        )}
                                    </AppleButton>
                                </span>
                            </Tooltip>
                        </Stack>

                        {/* Footer */}
                        <Box
                            sx={{
                                mt: 4,
                                pt: 3,
                                borderTop: "1px solid #e5e5e7",
                                width: "100%",
                                textAlign: "center"
                            }}
                        >
                            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
                                <Typography variant="body2" color="#86868b">
                                    Já tem conta?
                                </Typography>
                                <Button
                                    variant="text"
                                    size="small"
                                    sx={{
                                        fontWeight: 600,
                                        textTransform: "none",
                                        fontSize: "0.875rem",
                                        color: "#667eea",
                                        minWidth: "unset",
                                        px: 1.5,
                                        py: 0.2,
                                        borderRadius: "6px",
                                        "&:hover": {
                                            backgroundColor: "rgba(102, 126, 234, 0.04)",
                                        },
                                    }}
                                    onClick={() => navigate("/login")}
                                    disabled={loading || loadingSocial !== null}
                                >
                                    Entrar
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