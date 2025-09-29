import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
    Box,
    Typography,
    Paper,
    Button,
    Divider,
    IconButton,
    Tooltip,
    Stack,
    AppBar,
    Toolbar,
    Avatar,
    CircularProgress,
    Container,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SimCardIcon from "@mui/icons-material/SimCard";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";
import { buscarHistoricoApi } from "../api/simulacao";
import type { Usuario } from "../types/Usuario";
import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";

export default function DashboardPage() {
    const { user, token, logout } = useAuth() as { user: Usuario | null, token: string | null, logout: () => void };
    const navigate = useNavigate();

    const [historico, setHistorico] = useState<SimulacaoResponseDTO[]>([]);
    const [carregando, setCarregando] = useState(true);

    // Novo handler de logout!
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        async function buscarHistorico() {
            setCarregando(true);
            try {
                if (user?.email && token) {
                    const data = await buscarHistoricoApi(user.email, token);
                    setHistorico(Array.isArray(data) ? data : []);
                }
            } catch {
                setHistorico([]);
            }
            setCarregando(false);
        }
        buscarHistorico();
    }, [user, token]);

    let conteudoHistorico;
    if (carregando) {
        conteudoHistorico = (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={80}>
                <CircularProgress size={32} />
            </Box>
        );
    } else if (Array.isArray(historico) && historico.length === 0) {
        conteudoHistorico = (
            <Typography color="text.secondary" fontSize={15} mb={1}>
                Nenhuma simulação recente encontrada.
            </Typography>
        );
    } else if (Array.isArray(historico)) {
        conteudoHistorico = historico.slice(0, 5).map((simulacao, idx) => (
            <Paper key={idx}
                   elevation={0}
                   sx={{ mb: 2, p: 2, bgcolor: "#f5f8fa", borderRadius: 2 }}>
                <Typography fontWeight={600} fontSize={16}>
                    Simulação #{idx + 1}
                </Typography>
                <Typography fontSize={15}>
                    <b>CLT Líquido:</b> R$ {simulacao.salarioLiquidoClt?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} &nbsp; | <b>PJ Líquido:</b> R$ {simulacao.salarioLiquidoPj?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                    Provisão Benefícios: <b>R$ {simulacao.provisaoBeneficios?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</b>
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                    Reserva Sugerida: <b>R$ {simulacao.valorReservaSugerido?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</b>
                </Typography>
                {simulacao.comparativoDetalhado && (
                    <Typography fontSize={12} color="text.disabled">
                        Detalhes: {JSON.stringify(simulacao.comparativoDetalhado)}
                    </Typography>
                )}
            </Paper>
        ));
    }

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
            <Container maxWidth="md">
                <AppBar position="static" color="primary" elevation={2}>
                    <Toolbar>
                        <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                            {user?.email?.[0]?.toUpperCase() || "U"}
                        </Avatar>
                        <Typography variant="h6" sx={{ flex: 1 }}>
                            Dashboard
                        </Typography>
                        <Tooltip title="Sair">
                            {/* Alterado para handleLogout */}
                            <IconButton color="inherit" onClick={handleLogout}>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: 4
                }}>
                    {/* Card de boas-vindas */}
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Olá, {user?.email || "Usuário"}!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Bem-vindo ao seu painel. Veja suas simulações, acesse funcionalidades e muito mais!
                        </Typography>
                    </Paper>
                    {/* Atalhos/ações */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SimCardIcon />}
                            onClick={() => navigate("/simulacao")}
                            sx={{ fontWeight: 600, flex: 1 }}
                        >
                            Nova Simulação
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<HistoryIcon />}
                            onClick={() => navigate("/historico")}
                            sx={{ fontWeight: 600, flex: 1 }}
                        >
                            Histórico
                        </Button>
                    </Stack>
                    {/* Histórico de simulações */}
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                        <Typography variant="h6" mb={2} fontWeight={600}>
                            Últimas Simulações
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {conteudoHistorico}
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}