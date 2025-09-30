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
    Chip,
    Zoom,
    Badge,
    Fade,
    useTheme,
    Grid
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SimCardIcon from "@mui/icons-material/SimCard";
import HistoryIcon from "@mui/icons-material/History";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import InfoIcon from "@mui/icons-material/Info";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import { buscarHistoricoApi } from "../api/simulacao";
import type { Usuario } from "../types/Usuario";
import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import SimulacaoComparativoDetalhado from "../components/SimulacaoComparativoDetalhado";

export default function DashboardPage() {
    const { user, token, logout } = useAuth() as { user: Usuario | null, token: string | null, logout: () => void };
    const navigate = useNavigate();
    const theme = useTheme();

    const [historico, setHistorico] = useState<SimulacaoResponseDTO[]>([]);
    const [carregando, setCarregando] = useState(true);

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
                <AppBar position="static" color="primary" elevation={2} sx={{ borderRadius: 4, boxShadow: "0 1.5px 16px rgba(0,0,0,0.06)" }}>
                    <Toolbar>
                        <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                            {user?.email?.[0]?.toUpperCase() || "U"}
                        </Avatar>
                        <Typography variant="h6" sx={{ flex: 1 }}>
                            Dashboard
                        </Typography>
                        <Tooltip title="Sair da conta" arrow>
                            <IconButton color="inherit" onClick={handleLogout} aria-label="Sair do sistema">
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>

                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 5, position: "relative", overflow: "hidden", background: "#fff", boxShadow: "0 1.5px 16px rgba(0,0,0,0.06)" }}>
                        <Fade in>
                            <Box>
                                <Typography variant="h5" fontWeight={700} gutterBottom color="primary.main">
                                    Olá, {user?.email || "Usuário"}!
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Bem-vindo ao seu painel. Veja suas simulações, acesse funcionalidades e muito mais!
                                </Typography>
                                <Box sx={{ position: "absolute", right: 16, top: 16 }}>
                                    <Tooltip title="Conta Premium" arrow>
                                        <WorkspacePremiumIcon color="primary" fontSize="large" />
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Fade>
                    </Paper>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SimCardIcon />}
                            onClick={() => navigate("/simulacao")}
                            sx={{
                                fontWeight: 600,
                                flex: 1,
                                borderRadius: "14px",
                                background: "#fff",
                                color: "primary.main",
                                border: "1.5px solid #e3e8ee",
                                boxShadow: "none",
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
                            Nova Simulação
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<HistoryIcon />}
                            onClick={() => navigate("/historico")}
                            sx={{
                                fontWeight: 600,
                                flex: 1,
                                borderRadius: "14px",
                                background: "#fff",
                                color: "primary.main",
                                border: "1.5px solid #e3e8ee",
                                boxShadow: "none",
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
                            Histórico
                        </Button>
                    </Stack>

                    <Paper elevation={1} sx={{ p: 2, borderRadius: 5, background: "#fff", boxShadow: "0 1.5px 16px rgba(0,0,0,0.06)" }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variant="h6" fontWeight={600} color="primary.main">
                                Últimas Simulações
                            </Typography>
                            <Tooltip title="Ver como gráfico" arrow>
                                <IconButton size="small" color="primary" onClick={() => navigate("/historico")}>
                                    <BarChartIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Divider sx={{ mb: 2, background: "#e3e8ee" }} />

                        {carregando ? (
                            <Stack alignItems="center" gap={2}>
                                <CircularProgress size={32} color="primary" />
                                <Typography color="text.secondary" fontWeight={500}>
                                    Carregando suas simulações...
                                </Typography>
                            </Stack>
                        ) : Array.isArray(historico) && historico.length === 0 ? (
                            <Typography color="text.secondary" fontSize={15} mb={1}>
                                Nenhuma simulação recente encontrada.
                            </Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {historico.slice(0, 5).map((simulacao, idx) => (
                                    <Zoom in key={idx}>
                                        <Grid size={{ xs: 12, md: 6 }} sx={{ position: "relative" }}>
                                            <Paper
                                                elevation={2}
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 5,
                                                    bgcolor: theme.palette.mode === "dark" ? "grey.900" : "#f5f8fa",
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 1,
                                                    position: "relative",
                                                    boxShadow: "0 1.5px 16px rgba(0,0,0,0.06)",
                                                    transition: "box-shadow 0.14s, border 0.13s, transform 0.12s",
                                                    "&:hover": {
                                                        boxShadow: 6,
                                                        transform: "scale(1.03)",
                                                        borderColor: "primary.main"
                                                    }
                                                }}
                                            >
                                                {idx === 0 && (
                                                    <Badge
                                                        badgeContent="Mais Recente"
                                                        color="secondary"
                                                        sx={{
                                                            position: "absolute",
                                                            top: 14,
                                                            right: 14,
                                                            zIndex: 1,
                                                        }}
                                                    />
                                                )}
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <Chip
                                                        label={`#${idx + 1}`}
                                                        size="small"
                                                        color="primary"
                                                        icon={<TrendingUpIcon fontSize="small" />}
                                                    />
                                                    <Tooltip title="Salário Líquido CLT/PJ" arrow>
                                                        <Typography fontWeight={600} fontSize={16}>
                                                            CLT: {"salarioLiquidoCltBR" in simulacao
                                                                ? simulacao.salarioLiquidoCltBR
                                                                : `R$${simulacao.salarioLiquidoClt?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                                                            &nbsp;| PJ: {"salarioLiquidoPjBR" in simulacao
                                                                ? simulacao.salarioLiquidoPjBR
                                                                : `R$${simulacao.salarioLiquidoPj?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                                                        </Typography>
                                                    </Tooltip>
                                                </Stack>
                                                <Typography fontSize={14} color="text.secondary" display="flex" alignItems="center" gap={1}>
                                                    <SavingsIcon fontSize="small" color="action" /> Provisão Benefícios: <b>
                                                        {"provisaoBeneficiosBR" in simulacao
                                                            ? simulacao.provisaoBeneficiosBR
                                                            : `R$${simulacao.provisaoBeneficios?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                                                    </b>
                                                </Typography>
                                                <Typography fontSize={13} color="text.secondary" display="flex" alignItems="center" gap={1}>
                                                    <InfoIcon fontSize="small" color="action" /> Reserva Sugerida: <b>
                                                        {"valorReservaSugeridoBR" in simulacao
                                                            ? simulacao.valorReservaSugeridoBR
                                                            : `R$${simulacao.valorReservaSugerido?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                                                    </b>
                                                </Typography>
                                                <Typography fontSize={13} color="text.secondary" display="flex" alignItems="center" gap={1}>
                                                    <CalendarMonthIcon fontSize="small" color="action" /> {simulacao.comparativoDetalhado?.data ? `Data: ${simulacao.comparativoDetalhado.data}` : ""}
                                                </Typography>
                                                {simulacao.comparativoDetalhado && (
                                                    <Fade in>
                                                        <Box mt={1}>
                                                            <SimulacaoComparativoDetalhado detalhado={simulacao.comparativoDetalhado} />
                                                        </Box>
                                                    </Fade>
                                                )}
                                            </Paper>
                                        </Grid>
                                    </Zoom>
                                ))}
                            </Grid>
                        )}
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}