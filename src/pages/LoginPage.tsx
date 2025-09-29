import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Stack,
    Divider
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAuth } from "../hooks/useAuth"; // Corrigido para importar do novo hook
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    // URLs do backend para autenticação social
    const oauthGoogleUrl = "http://localhost:8080/oauth2/authorization/google";
    const oauthGithubUrl = "http://localhost:8080/oauth2/authorization/github";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await login({ email, senha });
            navigate("/dashboard");
        } catch (err) {
            setError("Erro ao fazer login. Verifique as credenciais.");
        }
    };

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
                    maxWidth: 400,
                    width: "100%",
                    borderRadius: 4,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Botão Voltar */}
                <Box sx={{ position: "absolute", left: 24, top: 24 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="text"
                        color="primary"
                        onClick={() => navigate(-1)}
                        sx={{ fontWeight: 600, textTransform: "none" }}
                    >
                        Voltar
                    </Button>
                </Box>
                <Typography variant="h5" gutterBottom align="center" sx={{ mt: 2 }}>
                    Login
                </Typography>
                <Divider sx={{ mb: 2, width: "100%" }} />
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width="100%"
                >
                    <TextField
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        required
                        fullWidth
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Entrar
                    </Button>
                </Box>
                <Divider sx={{ my: 2, width: "100%" }}>Ou entre com</Divider>
                <Stack spacing={1} width="100%">
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        href={oauthGoogleUrl}
                        sx={{ fontWeight: 600 }}
                    >
                        Google
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<GitHubIcon />}
                        href={oauthGithubUrl}
                        sx={{ fontWeight: 600 }}
                    >
                        GitHub
                    </Button>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                        Não tem conta?
                    </Typography>
                    <Button
                        variant="text"
                        color="primary"
                        size="small"
                        sx={{ ml: 1, fontWeight: 600 }}
                        onClick={() => navigate("/registro")}
                    >
                        Registrar
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}