import { useEffect, useState } from "react";
import { Paper, Typography, Box, Divider, List, ListItem, ListItemText, Button, ListItemButton } from "@mui/material";
import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import { buscarHistoricoApi } from "../api/simulacao";
import SimulacaoResultado from "../components/SimulacaoResultado";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HistoricoSimulacoes() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [historico, setHistorico] = useState<SimulacaoResponseDTO[]>([]);
    const [selecionada, setSelecionada] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        buscarHistoricoApi()
            .then(setHistorico)
            .finally(() => setLoading(false));
    }, [user, navigate]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                bgcolor: "background.default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper sx={{ p: 4, maxWidth: 700, width: "100%", borderRadius: 4 }}>
                <Typography variant="h5" gutterBottom align="center">Histórico de Simulações</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box>
                    {loading ? (
                        <Typography align="center" color="text.secondary">Carregando...</Typography>
                    ) : historico.length === 0 ? (
                        <Typography align="center" color="text.secondary">Nenhuma simulação encontrada.</Typography>
                    ) : (
                        <List>
                            {historico.map((sim, idx) => (
                                <ListItem key={idx} disablePadding>
                                    <ListItemButton onClick={() => setSelecionada(idx)}>
                                        <ListItemText
                                            primary={`Simulação #${idx + 1} - CLT: R$${sim.salarioLiquidoClt.toFixed(2)} / PJ: R$${sim.salarioLiquidoPj.toFixed(2)}`}
                                            secondary={sim.comparativoDetalhado?.data || ""}
                                        />
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{ ml: 2 }}
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
                    {selecionada !== null && historico[selecionada] && (
                        <Box mt={3}>
                            <SimulacaoResultado result={historico[selecionada]} />
                        </Box>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}