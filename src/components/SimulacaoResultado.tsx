import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import { Paper, Typography, Box, Divider, Stack, Chip, Tooltip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SimulacaoGrafico from "./SimulacaoGrafico";
import SimulacaoExportar from "./SimulacaoExportar";
import SimulacaoComparativoDetalhado from "./SimulacaoComparativoDetalhado";

function formatReal(valor: number | undefined | null) {
    const num = Number(valor);
    if (isNaN(num) || valor === undefined || valor === null) return "R$ 0,00";
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function SimulacaoResultado({ result }: { result: SimulacaoResponseDTO }) {
    const vantagem = (result?.salarioLiquidoPj ?? 0) > (result?.salarioLiquidoClt ?? 0) ? "PJ" : "CLT";
    const valorVantagem = Math.abs((result?.salarioLiquidoPj ?? 0) - (result?.salarioLiquidoClt ?? 0));

    return (
        <Box>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: 7,
                    boxShadow: "0 4px 32px rgba(0,0,0,0.11)",
                    mb: 4,
                    background: "#fff",
                    border: "1.2px solid #e3e8ee",
                    transition: "box-shadow 0.18s, border 0.13s"
                }}
                aria-label="Resultado da Simulação"
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: "#1d1d1f", mb: 0.5 }}>
                    Resultado da Simulação
                </Typography>
                <Divider sx={{ mb: 4, background: "#e3e8ee" }} />

                {/* Vantagem Principal */}
                <Tooltip 
                    title={vantagem === "PJ" 
                        ? "PJ geralmente tem mais flexibilidade, mas menos garantias trabalhistas." 
                        : "CLT oferece mais proteção, estabilidade e benefícios."}
                    arrow
                >
                    <Box
                        sx={{
                            bgcolor: "#f4f8fb",
                            p: { xs: 3, md: 4 },
                            borderRadius: 7,
                            textAlign: "center",
                            mb: 5,
                            boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
                            border: "1.2px solid #e3e8ee",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        aria-label="Resumo de vantagem"
                    >
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={0.5}>
                            {vantagem === "PJ" ? (
                                <TrendingUpIcon sx={{ fontSize: 32, color: "#43a047" }} />
                            ) : (
                                <TrendingDownIcon sx={{ fontSize: 32, color: "#0071e3" }} />
                            )}
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0071e3" }}>
                                {vantagem} é mais vantajoso
                            </Typography>
                        </Stack>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: "#0071e3", mt: 0.3 }}>
                            {formatReal(valorVantagem)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#6e6e73", mt: 0.5 }}>
                            de vantagem mensal
                        </Typography>
                    </Box>
                </Tooltip>

                {/* Salários Líquidos */}
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={3}>
                    <Box flex={1}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                borderRadius: 7,
                                bgcolor: "#fff",
                                border: "1.7px solid #e3e8ee",
                                boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                                transition: "border-color 0.13s",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: 1,
                                mb: { xs: 2.5, md: 0 }
                            }}
                            aria-label="Salário Líquido CLT"
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                                Salário Líquido CLT
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1d1d1f" }}>
                                {formatReal(result?.salarioLiquidoClt)}
                            </Typography>
                            {vantagem === "CLT" && (
                                <Chip
                                    label="Melhor opção"
                                    color="info"
                                    size="small"
                                    sx={{
                                        mt: 1,
                                        background: "#e8f0fa",
                                        color: "#0071e3",
                                        fontWeight: 600,
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 6,
                                        fontSize: "0.98em"
                                    }}
                                />
                            )}
                        </Paper>
                    </Box>
                    <Box flex={1}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                borderRadius: 7,
                                bgcolor: "#fff",
                                border: "1.7px solid #e3e8ee",
                                boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                                transition: "border-color 0.13s",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: 1,
                                mb: { xs: 2.5, md: 0 }
                            }}
                            aria-label="Salário Líquido PJ"
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                                Salário Líquido PJ
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: "#43a047" }}>
                                {formatReal(result?.salarioLiquidoPj)}
                            </Typography>
                            {vantagem === "PJ" && (
                                <Chip
                                    label="Melhor opção"
                                    color="success"
                                    size="small"
                                    sx={{
                                        mt: 1,
                                        background: "#e6f4ea",
                                        color: "#43a047",
                                        fontWeight: 600,
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 6,
                                        fontSize: "0.98em"
                                    }}
                                />
                            )}
                        </Paper>
                    </Box>
                </Stack>

                {/* Informações Adicionais */}
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={2}>
                    <Box flex={1}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2.5,
                                borderRadius: 7,
                                bgcolor: "#f5f5f7",
                                boxShadow: "none",
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                                border: "1.2px solid #e3e8ee"
                            }}
                            aria-label="Provisão de Benefícios CLT"
                        >
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Provisão de Benefícios CLT
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                                {formatReal(result?.provisaoBeneficios)}
                            </Typography>
                        </Paper>
                    </Box>
                    <Box flex={1}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2.5,
                                borderRadius: 7,
                                bgcolor: "#fff8e6",
                                boxShadow: "none",
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                                border: "1.2px solid #ffe0b2"
                            }}
                            aria-label="Reserva Emergência Sugerida PJ"
                        >
                            <Typography variant="caption" color="warning.dark" display="block" mb={0.5} sx={{ fontWeight: 600 }}>
                                Reserva Emergência Sugerida PJ
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "#b2741e" }}>
                                {formatReal(result?.valorReservaSugerido)}
                            </Typography>
                        </Paper>
                    </Box>
                </Stack>

                {/* Análise Automática */}
                <Divider sx={{ my: 4, background: "#e3e8ee" }} />
                <Box
                    sx={{
                        bgcolor: "#f5f5f7",
                        p: 3,
                        borderRadius: 7,
                        border: "1.2px solid #e3e8ee",
                        transition: "background 0.12s",
                        mb: 1.5,
                        mt: 0.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5
                    }}
                    aria-label="Análise automática"
                >
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                        💡 Análise
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#1d1d1f" }}>
                        {vantagem === "PJ"
                            ? `O regime PJ oferece ${formatReal(valorVantagem)} a mais por mês. Considere os custos com contabilidade e a ausência de benefícios trabalhistas.`
                            : `O regime CLT oferece ${formatReal(valorVantagem)} a mais por mês quando considerados todos os benefícios e a segurança jurídica.`
                        }
                    </Typography>
                </Box>
            </Paper>

            {/* Gráfico */}
            <Box mb={3}>
                <SimulacaoGrafico result={result} />
            </Box>

            {/* Comparativo Detalhado */}
            {result?.comparativoDetalhado && (
                <Box mb={3}>
                    <SimulacaoComparativoDetalhado detalhado={result.comparativoDetalhado} />
                </Box>
            )}

            {/* Exportar */}
            <SimulacaoExportar result={result} />
        </Box>
    );
}