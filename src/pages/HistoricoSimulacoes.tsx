import { useEffect, useState } from "react";
import {
    Paper, Typography, Box, Divider, List, ListItem, ListItemText, Button, ListItemButton, CircularProgress, Container, Stack,
} from "@mui/material";
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

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
            return;
        }
        buscarHistoricoApi(user.email, token)
            .then(setHistorico)
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
                py: { xs: 3, md: 6 }
            }}
        >
            <Container maxWidth="md">
                <Paper sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    boxShadow: "0 4px 24px rgba(33,150,243,0.10)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: 420,
                }}>
                    <Typography variant="h5" gutterBottom align="center" fontWeight={700}>
                        Histórico de Simulações
                    </Typography>
                    <Divider sx={{ mb: 3, width: "100%" }} />

                    <Box sx={{ width: "100%" }}>
                        {loading ? (
                            <Stack alignItems="center" py={2}>
                                <CircularProgress color="primary" />
                                <Typography mt={2} color="text.secondary">Carregando...</Typography>
                            </Stack>
                        ) : historico.length === 0 ? (
                            <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                                Nenhuma simulação encontrada.
                            </Typography>
                        ) : (
                            <List sx={{ width: "100%" }}>
                                {historico.map((sim, idx) => (
                                    <ListItem key={idx} disablePadding sx={{
                                        bgcolor: selecionada === idx ? "primary.light" : undefined,
                                        borderRadius: 2,
                                        mb: 1,
                                        transition: "background 0.2s"
                                    }}>
                                        <ListItemButton onClick={() => setSelecionada(idx)}>
                                            <ListItemText
                                                primary={
                                                    <Typography fontWeight={600}>
                                                        {`Simulação #${idx + 1} - CLT: ${sim.salarioLiquidoCltBR || `R$${sim.salarioLiquidoClt.toFixed(2)}`} / PJ: ${sim.salarioLiquidoPjBR || `R$${sim.salarioLiquidoPj.toFixed(2)}`}`}
                                                    </Typography>
                                                }
                                                secondary={
                                                    sim.comparativoDetalhado?.data
                                                        ? `Data: ${sim.comparativoDetalhado.data}`
                                                        : ""
                                                }
                                            />
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{ ml: 2, fontWeight: 500 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelecionada(idx);
                                                }}
                                            >
                                                Ver Detalhes
                                            </Button>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                    {selecionada !== null && historico[selecionada] && (
                        <Box mt={4} width="100%">
                            <SimulacaoResultado result={historico[selecionada]} />
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}