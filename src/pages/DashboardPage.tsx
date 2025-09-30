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
    Avatar,
    CircularProgress,
    Container,
    Chip,
    Zoom,
    Badge,
    Fade,
    Slide,
    Grid,
    styled,
    alpha,
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
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { buscarHistoricoApi } from "../api/simulacao";
import type { Usuario } from "../types/Usuario";
import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import SimulacaoComparativoDetalhado from "../components/SimulacaoComparativoDetalhado";

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

export default function DashboardPage() {
    const [mounted, setMounted] = useState(false);
    const { user, token, logout } = useAuth() as { user: Usuario | null, token: string | null, logout: () => void };
    const navigate = useNavigate();

    const [historico, setHistorico] = useState<SimulacaoResponseDTO[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const formatarMoeda = (valor: number) => {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    const getIniciaisUsuario = (email: string) => {
        return email[0]?.toUpperCase() || "U";
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                bgcolor: "#fafafa",
                py: { xs: 3, md: 6 },
            }}
        >
            <Container maxWidth="lg">
                {/* Header com informações do usuário */}
                <Slide direction="down" in={mounted} timeout={500}>
                    <Paper 
                        elevation={0}
                        sx={{
                            p: 3,
                            mb: 4,
                            borderRadius: 4,
                            border: "1px solid #e5e5e7",
                            backgroundColor: "#ffffff",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#ffffff",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <Box sx={{ position: "relative", zIndex: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar 
                                        sx={{ 
                                            width: 56, 
                                            height: 56, 
                                            bgcolor: "rgba(255, 255, 255, 0.2)",
                                            border: "2px solid rgba(255, 255, 255, 0.3)",
                                            fontSize: "1.5rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {user?.email ? getIniciaisUsuario(user.email) : "U"}
                                    </Avatar>
                                    <Box>
                                        <Typography 
                                            variant="h4" 
                                            sx={{ 
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                fontWeight: 700,
                                                mb: 0.5,
                                            }}
                                        >
                                            Olá, {user?.email?.split('@')[0] || "Usuário"}!
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                opacity: 0.9,
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                            }}
                                        >
                                            Bem-vindo ao seu painel de simulações
                                        </Typography>
                                    </Box>
                                </Box>
                                <Tooltip title="Sair" arrow placement="bottom">
                                    <span>
                                        <IconButton
                                            onClick={handleLogout}
                                            sx={{
                                                color: "#ffffff",
                                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                "&:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                                                },
                                            }}
                                        >
                                            <LogoutIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                            
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                <WorkspacePremiumIcon sx={{ opacity: 0.9 }} />
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        opacity: 0.9,
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    }}
                                >
                                    Conta Premium • {historico.length} simulações realizadas
                                </Typography>
                            </Box>
                        </Box>
                        
                        {/* Elementos decorativos de fundo */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: -50,
                                right: -50,
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: -30,
                                left: -30,
                                width: 150,
                                height: 150,
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                            }}
                        />
                    </Paper>
                </Slide>

                {/* Card de ações principais */}
                <Zoom in={mounted} timeout={600}>
                    <Paper 
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 4 },
                            mb: 4,
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
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "50%",
                                    backgroundColor: "#f5f5f7",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                <DashboardIcon sx={{ fontSize: 24, color: "#667eea" }} />
                            </Box>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    fontWeight: 700,
                                    color: "#1d1d1f",
                                    mb: 1,
                                }}
                            >
                                Ações Rápidas
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: "#86868b",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                }}
                            >
                                Comece uma nova simulação ou revise o histórico
                            </Typography>
                        </Box>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <AppleButton
                                variant="contained"
                                startIcon={<SimCardIcon />}
                                onClick={() => navigate("/simulacao")}
                                sx={{
                                    flex: 1,
                                    py: 1.75,
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    color: "#ffffff",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #5568d3 0%, #6a3f91 100%)",
                                    },
                                }}
                            >
                                Nova Simulação
                            </AppleButton>
                            <AppleButton
                                variant="outlined"
                                startIcon={<HistoryIcon />}
                                onClick={() => navigate("/historico")}
                                sx={{
                                    flex: 1,
                                    borderColor: "#d2d2d7",
                                    color: "#1d1d1f",
                                    "&:hover": {
                                        borderColor: "#86868b",
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                    },
                                }}
                            >
                                Ver Histórico
                            </AppleButton>
                        </Stack>
                    </Paper>
                </Zoom>

                {/* Card de últimas simulações */}
                <Zoom in={mounted} timeout={800}>
                    <Paper 
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 4 },
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
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        backgroundColor: "#f5f5f7",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <BarChartIcon sx={{ fontSize: 20, color: "#667eea" }} />
                                </Box>
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        fontWeight: 700,
                                        color: "#1d1d1f",
                                    }}
                                >
                                    Últimas Simulações
                                </Typography>
                            </Box>
                            <Tooltip title="Ver gráficos detalhados" arrow placement="top">
                                <span>
                                    <IconButton 
                                        sx={{
                                            color: "#86868b",
                                            "&:hover": {
                                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                            },
                                        }}
                                    >
                                        <TrendingUpIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>

                        <Divider sx={{ mb: 3, borderColor: "#e5e5e7" }} />

                        {carregando ? (
                            <Stack alignItems="center" py={4} gap={2}>
                                <CircularProgress 
                                    size={48}
                                    sx={{ color: "#667eea" }} 
                                />
                                <Typography 
                                    color="#86868b"
                                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                                >
                                    Carregando suas simulações...
                                </Typography>
                            </Stack>
                        ) : historico.length === 0 ? (
                            <Fade in timeout={300}>
                                <Box sx={{ textAlign: "center", py: 4 }}>
                                    <Typography 
                                        variant="h6" 
                                        color="#86868b"
                                        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                                        gutterBottom
                                    >
                                        Nenhuma simulação encontrada
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="#86868b"
                                        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                                    >
                                        Suas simulações aparecerão aqui
                                    </Typography>
                                </Box>
                            </Fade>
                        ) : (
                            <Grid container spacing={2}>
                                {historico.slice(0, 6).map((simulacao, idx) => (
                                    <Grid size={{ xs: 12, md: 6 }} key={idx}>
                                        <Fade in timeout={(idx + 1) * 200}>
                                            <Paper
                                                sx={{
                                                    p: 3,
                                                    borderRadius: 3,
                                                    border: "1px solid #e5e5e7",
                                                    backgroundColor: "#ffffff",
                                                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    position: "relative",
                                                    "&:hover": {
                                                        borderColor: "#d2d2d7",
                                                        transform: "translateY(-2px)",
                                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                                    },
                                                }}
                                            >
                                                {idx === 0 && (
                                                    <Badge
                                                        badgeContent="Mais Recente"
                                                        color="primary"
                                                        sx={{
                                                            position: "absolute",
                                                            top: -8,
                                                            right: -8,
                                                            "& .MuiBadge-badge": {
                                                                backgroundColor: "#667eea",
                                                                color: "#ffffff",
                                                                fontWeight: 600,
                                                            },
                                                        }}
                                                    />
                                                )}
                                                
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                                    <Chip
                                                        label={`#${idx + 1}`}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: "#f5f5f7",
                                                            color: "#1d1d1f",
                                                            fontWeight: 600,
                                                        }}
                                                        icon={<TrendingUpIcon fontSize="small" />}
                                                    />
                                                    <Typography 
                                                        variant="h6"
                                                        sx={{ 
                                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                            fontWeight: 600,
                                                            color: "#1d1d1f",
                                                        }}
                                                    >
                                                        Simulação {idx + 1}
                                                    </Typography>
                                                </Box>

                                                <Stack spacing={1.5}>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <SimCardIcon sx={{ fontSize: 16, color: "#86868b" }} />
                                                        <Typography 
                                                            variant="body2"
                                                            sx={{ 
                                                                color: "#1d1d1f",
                                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                            }}
                                                        >
                                                            <strong>CLT:</strong> {simulacao.salarioLiquidoCltBR || formatarMoeda(simulacao.salarioLiquidoClt)}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <SimCardIcon sx={{ fontSize: 16, color: "#86868b" }} />
                                                        <Typography 
                                                            variant="body2"
                                                            sx={{ 
                                                                color: "#1d1d1f",
                                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                            }}
                                                        >
                                                            <strong>PJ:</strong> {simulacao.salarioLiquidoPjBR || formatarMoeda(simulacao.salarioLiquidoPj)}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <SavingsIcon sx={{ fontSize: 16, color: "#86868b" }} />
                                                        <Typography 
                                                            variant="body2"
                                                            sx={{ 
                                                                color: "#86868b",
                                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                            }}
                                                        >
                                                            Benefícios: {simulacao.provisaoBeneficiosBR || formatarMoeda(simulacao.provisaoBeneficios)}
                                                        </Typography>
                                                  </Box>
                                                    {simulacao.comparativoDetalhado &&
                                                        Object.keys(simulacao.comparativoDetalhado).map((chave) => (
                                                            <Box 
                                                                key={chave}
                                                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                                            >
                                                                <CalendarMonthIcon sx={{ fontSize: 16, color: "#86868b" }} />
                                                                <Typography 
                                                                    variant="caption"
                                                                    sx={{ 
                                                                        color: "#86868b",
                                                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                                    }}
                                                                >
                                                                    {chave}
                                                                </Typography>
                                                            </Box>
                                                        ))
                                                    }
                                                    </Stack>

                                                    {simulacao.comparativoDetalhado && (
                                                        <Fade in timeout={500}>
                                                            <Box mt={2}>
                                                                <SimulacaoComparativoDetalhado detalhado={simulacao.comparativoDetalhado} />
                                                            </Box>
                                                        </Fade>
                                                    )}
                                            </Paper>
                                        </Fade>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Paper>
                </Zoom>
            </Container>
        </Box>
    );
}