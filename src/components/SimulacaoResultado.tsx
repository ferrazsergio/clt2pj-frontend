import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import { Paper, Typography, Box, Divider, Stack, Chip } from "@mui/material";
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
    // Calcula qual regime é mais vantajoso
    const vantagem = (result?.salarioLiquidoPj ?? 0) > (result?.salarioLiquidoClt ?? 0) ? "PJ" : "CLT";
    const valorVantagem = Math.abs((result?.salarioLiquidoPj ?? 0) - (result?.salarioLiquidoClt ?? 0));

    return (
        <Box>
            {/* Card Principal - Resultado Resumido */}
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    boxShadow: "0 4px 24px rgba(33,150,243,0.12)",
                    mb: 3
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Resultado da Simulação
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {/* Vantagem Principal */}
                <Box
                    sx={{
                        bgcolor: vantagem === "PJ" ? "success.light" : "info.light",
                        color: vantagem === "PJ" ? "success.dark" : "info.dark",
                        p: 3,
                        borderRadius: 2,
                        textAlign: "center",
                        mb: 3
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={1}>
                        {vantagem === "PJ" ? (
                            <TrendingUpIcon sx={{ fontSize: 32 }} />
                        ) : (
                            <TrendingDownIcon sx={{ fontSize: 32 }} />
                        )}
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {vantagem} é mais vantajoso
                        </Typography>
                    </Stack>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {formatReal(valorVantagem)}
                    </Typography>
                    <Typography variant="body2">
                        de vantagem mensal
                    </Typography>
                </Box>

                {/* Salários Líquidos */}
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={3}>
                    <Box flex={1}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2.5,
                                borderRadius: 2,
                                bgcolor: "background.default",
                                border: "2px solid",
                                borderColor: vantagem === "CLT" ? "info.main" : "grey.300"
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                                Salário Líquido CLT
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main" }}>
                                {formatReal(result?.salarioLiquidoClt)}
                            </Typography>
                            {vantagem === "CLT" && (
                                <Chip
                                    label="Melhor opção"
                                    color="info"
                                    size="small"
                                    sx={{ mt: 1 }}
                                />
                            )}
                        </Paper>
                    </Box>
                    <Box flex={1}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2.5,
                                borderRadius: 2,
                                bgcolor: "background.default",
                                border: "2px solid",
                                borderColor: vantagem === "PJ" ? "success.main" : "grey.300"
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                                Salário Líquido PJ
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: "success.main" }}>
                                {formatReal(result?.salarioLiquidoPj)}
                            </Typography>
                            {vantagem === "PJ" && (
                                <Chip
                                    label="Melhor opção"
                                    color="success"
                                    size="small"
                                    sx={{ mt: 1 }}
                                />
                            )}
                        </Paper>
                    </Box>
                </Stack>

                {/* Informações Adicionais */}
                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                    <Box flex={1}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2.5,
                                borderRadius: 2,
                                bgcolor: "grey.50"
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Provisão de Benefícios CLT
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {formatReal(result?.provisaoBeneficios)}
                            </Typography>
                        </Paper>
                    </Box>
                    <Box flex={1}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2.5,
                                borderRadius: 2,
                                bgcolor: "warning.light",
                                borderColor: "warning.main"
                            }}
                        >
                            <Typography variant="caption" color="warning.dark" display="block" mb={0.5} sx={{ fontWeight: 600 }}>
                                Reserva Emergência Sugerida PJ
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "warning.dark" }}>
                                {formatReal(result?.valorReservaSugerido)}
                            </Typography>
                        </Paper>
                    </Box>
                </Stack>

                {/* Análise Automática */}
                <Divider sx={{ my: 3 }} />
                <Box
                    sx={{
                        bgcolor: "grey.50",
                        p: 2.5,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "grey.200"
                    }}
                >
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                        💡 Análise
                    </Typography>
                    <Typography variant="body1">
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