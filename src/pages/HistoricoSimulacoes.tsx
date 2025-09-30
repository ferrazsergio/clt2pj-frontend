import { useEffect, useState } from "react";
import {
    Paper,
    Typography,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
    ListItemButton,
    CircularProgress,
    Container,
    Stack,
    Fade,
    Zoom,
    Slide,
    Tooltip,
    IconButton,
    Alert,
    styled,
    alpha,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import HistoryIcon from "@mui/icons-material/History";
import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import { buscarHistoricoApi } from "../api/simulacao";
import SimulacaoResultado from "../components/SimulacaoResultado";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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

export default function HistoricoSimulacoes() {
    const [mounted, setMounted] = useState(false);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [historico, setHistorico] = useState<SimulacaoResponseDTO[]>([]);
    const [selecionada, setSelecionada] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/dashboard");
        }
    };

    useEffect(() => {
    if (!user || !token) {
        navigate("/login");
        return;
    }

    
    buscarHistoricoApi(user.email, token)
        .then((data) => {
            
            if (!data || !Array.isArray(data)) {
                setApiError("Erro ao buscar histórico. Tente novamente.");
                setHistorico([]);
            } else {
                setHistorico(data);
            }
        })
        .catch((error) => {
            setApiError("Erro ao buscar histórico. Tente novamente.");
        })
        .finally(() => setLoading(false));
}, [user, token, navigate]);

    const formatarMoeda = (valor: number) => {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
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

                {/* Card principal do histórico */}
                <Zoom in={mounted} timeout={600}>
                    <Paper 
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
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
                                <HistoryIcon sx={{ fontSize: 32, color: "#ffffff" }} />
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
                                Histórico de Simulações
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: "#86868b",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                }}
                            >
                                Revise e compare suas simulações anteriores
                            </Typography>
                        </Box>

                        <Divider sx={{ 
                            mb: 4, 
                            width: "100%", 
                            borderColor: "#e5e5e7" 
                        }} />

                        {/* Conteúdo do histórico */}
                        <Box sx={{ width: "100%" }}>
                            {loading ? (
                                <Stack alignItems="center" py={4}>
                                    <CircularProgress 
                                        size={48}
                                        sx={{ color: "#667eea" }} 
                                    />
                                    <Typography 
                                        mt={2} 
                                        color="#86868b"
                                        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                                    >
                                        Carregando histórico...
                                    </Typography>
                                </Stack>
                            ) : apiError ? (
                                <Fade in timeout={300}>
                                    <Alert 
                                        severity="error"
                                        sx={{ 
                                            borderRadius: 3,
                                            mb: 3,
                                            "& .MuiAlert-icon": {
                                                fontSize: 24,
                                            }
                                        }}
                                    >
                                        {apiError}
                                    </Alert>
                                </Fade>
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
                                <List sx={{ width: "100%" }}>
                                    {historico.map((sim, idx) => (
                                        <Fade in key={idx} timeout={(idx + 1) * 200}>
                                            <ListItem
                                                disablePadding
                                                sx={{
                                                    mb: 2,
                                                }}
                                            >
                                                <ListItemButton
                                                    onClick={() => setSelecionada(selecionada === idx ? null : idx)}
                                                    sx={{
                                                        p: 3,
                                                        borderRadius: 3,
                                                        border: "1px solid #e5e5e7",
                                                        backgroundColor: selecionada === idx ? "#f8f9ff" : "#ffffff",
                                                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                                        "&:hover": {
                                                            backgroundColor: "#fafafa",
                                                            borderColor: "#d2d2d7",
                                                            transform: "translateY(-2px)",
                                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                                        },
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                                                                <InfoIcon sx={{ color: "#667eea", fontSize: 20 }} />
                                                                <Typography 
                                                                    variant="h6"
                                                                    sx={{ 
                                                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                                        fontWeight: 600,
                                                                        color: "#1d1d1f",
                                                                    }}
                                                                >
                                                                    Simulação #{idx + 1}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        secondary={
                                                            <Box sx={{ mt: 1 }}>
                                                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                                                    <Typography 
                                                                        variant="body2"
                                                                        sx={{ 
                                                                            color: "#86868b",
                                                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                                        }}
                                                                    >
                                                                        <strong>CLT:</strong> {sim.salarioLiquidoCltBR || formatarMoeda(sim.salarioLiquidoClt)}
                                                                    </Typography>
                                                                    <Typography 
                                                                        variant="body2"
                                                                        sx={{ 
                                                                            color: "#86868b",
                                                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                                        }}
                                                                    >
                                                                        <strong>PJ:</strong> {sim.salarioLiquidoPjBR || formatarMoeda(sim.salarioLiquidoPj)}
                                                                    </Typography>
                                                                </Stack>
                                                               {sim.comparativoDetalhado && (
                                                                    Object.keys(sim.comparativoDetalhado).map((chave) => (
                                                                        <Typography 
                                                                            key={chave}
                                                                            variant="caption"
                                                                            sx={{ 
                                                                                color: "#86868b",
                                                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                                                display: "block",
                                                                                mt: 1,
                                                                            }}
                                                                        >
                                                                            Data: {chave}
                                                                        </Typography>
                                                                    ))
                                                                )}

                                                            </Box>
                                                        }
                                                    />
                                                    <Tooltip 
                                                        title={selecionada === idx ? "Ocultar detalhes" : "Ver detalhes"} 
                                                        arrow 
                                                        placement="top"
                                                    >
                                                        <span>
                                                            <AppleButton
                                                                variant="outlined"
                                                                size="medium"
                                                                sx={{
                                                                    borderColor: "#d2d2d7",
                                                                    color: "#1d1d1f",
                                                                    minWidth: "120px",
                                                                    "&:hover": {
                                                                        borderColor: "#86868b",
                                                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                                    },
                                                                }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelecionada(selecionada === idx ? null : idx);
                                                                }}
                                                            >
                                                                {selecionada === idx ? "Ocultar" : "Detalhes"}
                                                            </AppleButton>
                                                        </span>
                                                    </Tooltip>
                                                </ListItemButton>
                                            </ListItem>
                                        </Fade>
                                    ))}
                                </List>
                            )}
                        </Box>

                        {/* Resultado da simulação selecionada */}
                        {selecionada !== null && historico[selecionada] && (
                            <Fade in timeout={500}>
                                <Box 
                                    mt={4}
                                    sx={{
                                        borderRadius: 3,
                                        border: "1px solid #e5e5e7",
                                        overflow: "hidden",
                                    }}
                                >
                                    <SimulacaoResultado result={historico[selecionada]} />
                                </Box>
                            </Fade>
                        )}
                    </Paper>
                </Zoom>
            </Container>
        </Box>
    );
}