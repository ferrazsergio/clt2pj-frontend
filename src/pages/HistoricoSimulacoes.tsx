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
    Tooltip,
    IconButton,
    Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import { buscarHistoricoApi } from "../api/simulacao";
import SimulacaoResultado from "../components/SimulacaoResultado";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function HistoricoSimulacoes() {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [historico, setHistorico] = useState<SimulacaoResponseDTO[]>([]);
    const [selecionada, setSelecionada] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

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
            .catch(() => setApiError("Erro ao buscar histórico. Tente novamente."))
            .finally(() => setLoading(false));
    }, [user, token, navigate]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                bgcolor: "background.default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 3, md: 6 },
                transition: "background 0.25s"
            }}
        >
            <Container maxWidth="md">
                <Zoom in>
                    <Paper sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: 5,
                        boxShadow: "0 1.5px 16px rgba(0,0,0,0.06)",
                        border: "1.2px solid #e3e8ee",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: 420,
                        background: "#fff",
                        transition: "box-shadow 0.14s, border 0.13s",
                        "&:hover": {
                            boxShadow: "0 3px 28px rgba(0,0,0,0.11)",
                            border: "1.7px solid #b0b8c9",
                        },
                    }}>
                        {/* Botão voltar */}
                        <Fade in>
                            <Box width="100%" mb={1} display="flex" justifyContent="flex-start">
                                <Tooltip title="Voltar para o painel" arrow>
                                    <span>
                                        <IconButton
                                            color="primary"
                                            onClick={handleBack}
                                            sx={{
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
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        </Fade>

                        <Typography variant="h5" gutterBottom align="center" fontWeight={700} color="primary.main">
                            Histórico de Simulações
                        </Typography>
                        <Divider sx={{ mb: 3, width: "100%", background: "#e3e8ee" }} />

                        <Box sx={{ width: "100%" }}>
                            {loading ? (
                                <Stack alignItems="center" py={2}>
                                    <CircularProgress color="primary" />
                                    <Typography mt={2} color="text.secondary">Carregando...</Typography>
                                </Stack>
                            ) : apiError ? (
                                <Fade in>
                                    <Alert severity="error" sx={{ my: 2, width: "100%" }}>
                                        {apiError}
                                    </Alert>
                                </Fade>
                            ) : historico.length === 0 ? (
                                <Fade in>
                                    <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                                        Nenhuma simulação encontrada.
                                    </Typography>
                                </Fade>
                            ) : (
                                <List sx={{ width: "100%" }}>
                                    {historico.map((sim, idx) => (
                                        <Fade in key={idx}>
                                            <ListItem
                                                disablePadding
                                                sx={{
                                                    bgcolor: selecionada === idx ? "primary.light" : undefined,
                                                    borderRadius: 3,
                                                    mb: 1,
                                                    transition: "background 0.14s"
                                                }}
                                            >
                                                <ListItemButton
                                                    onClick={() => setSelecionada(idx)}
                                                    sx={{
                                                        background: "#fff",
                                                        borderRadius: 3,
                                                        border: "1.2px solid #e3e8ee",
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
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Stack direction="row" alignItems="center" gap={1}>
                                                                <InfoIcon fontSize="small" color="action" />
                                                                <Typography fontWeight={600}>
                                                                    {`Simulação #${idx + 1} - CLT: ${sim.salarioLiquidoCltBR || `R$${sim.salarioLiquidoClt.toFixed(2)}`} / PJ: ${sim.salarioLiquidoPjBR || `R$${sim.salarioLiquidoPj.toFixed(2)}`}`}
                                                                </Typography>
                                                            </Stack>
                                                        }
                                                        secondary={
                                                            sim.comparativoDetalhado?.data
                                                                ? `Data: ${sim.comparativoDetalhado.data}`
                                                                : ""
                                                        }
                                                    />
                                                    <Tooltip title="Ver detalhes desta simulação" arrow>
                                                        <span>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{
                                                                    ml: 2,
                                                                    fontWeight: 500,
                                                                    borderRadius: 3,
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
                                                                }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelecionada(idx);
                                                                }}
                                                            >
                                                                Ver Detalhes
                                                            </Button>
                                                        </span>
                                                    </Tooltip>
                                                </ListItemButton>
                                            </ListItem>
                                        </Fade>
                                    ))}
                                </List>
                            )}
                        </Box>
                        {selecionada !== null && historico[selecionada] && (
                            <Fade in>
                                <Box mt={4} width="100%">
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