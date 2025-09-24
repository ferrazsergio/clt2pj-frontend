import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

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
        <Paper elevation={3} sx={{ p: 4, mt: 4, maxWidth: 400, mx: "auto" }}>
            <Typography variant="h5" gutterBottom>Login</Typography>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                <TextField label="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth />
                <TextField label="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} required fullWidth />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary">Entrar</Button>
            </Box>
        </Paper>
    );
}