import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import { Paper, Typography, Box, Divider, Stack, Chip, Tooltip, Fade, Zoom, Slide } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CalculateIcon from "@mui/icons-material/Calculate";
import SavingsIcon from "@mui/icons-material/Savings";
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
            <Zoom in timeout={600}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: 4,
                        border: "1px solid #e5e5e7",
                        backgroundColor: "#ffffff",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        mb: 4,
                        "&:hover": {
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
                            borderColor: "#d2d2d7",
                        },
                    }}
                    aria-label="Resultado da Simulação"
                >
                    {/* Header */}
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
                            <CalculateIcon sx={{ fontSize: 32, color: "#ffffff" }} />
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
                            Resultado da Simulação
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: "#86868b",
                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                            }}
                        >
                            Comparação detalhada entre os regimes CLT e PJ
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 4, borderColor: "#e5e5e7" }} />

                    {/* Vantagem Principal */}
                    <Fade in timeout={800}>
                        <Tooltip 
                            title={vantagem === "PJ" 
                                ? "PJ geralmente tem mais flexibilidade, mas menos garantias trabalhistas." 
                                : "CLT oferece mais proteção, estabilidade e benefícios."}
                            arrow
                            placement="top"
                        >
                            <Box
                                sx={{
                                    background: vantagem === "PJ" 
                                        ? "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)" 
                                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    p: { xs: 3, md: 4 },
                                    borderRadius: 3,
                                    textAlign: "center",
                                    mb: 4,
                                    color: "#ffffff",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                                aria-label="Resumo de vantagem"
                            >
                                {/* Elementos decorativos de fundo */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: -20,
                                        right: -20,
                                        width: 100,
                                        height: 100,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: -30,
                                        left: -30,
                                        width: 120,
                                        height: 120,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    }}
                                />

                                <Box sx={{ position: "relative", zIndex: 2 }}>
                                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={1}>
                                        {vantagem === "PJ" ? (
                                            <TrendingUpIcon sx={{ fontSize: 32 }} />
                                        ) : (
                                            <TrendingDownIcon sx={{ fontSize: 32 }} />
                                        )}
                                        <Typography 
                                            variant="h5" 
                                            sx={{ 
                                                fontWeight: 700,
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                            }}
                                        >
                                            {vantagem} é mais vantajoso
                                        </Typography>
                                    </Stack>
                                    <Typography 
                                        variant="h3" 
                                        sx={{ 
                                            fontWeight: 700, 
                                            mb: 1,
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        }}
                                    >
                                        {formatReal(valorVantagem)}
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            opacity: 0.9,
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        }}
                                    >
                                        de vantagem mensal
                                    </Typography>
                                </Box>
                            </Box>
                        </Tooltip>
                    </Fade>

                    {/* Salários Líquidos */}
                    <Slide direction="up" in timeout={1000}>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
                            <Box flex={1}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        border: "1px solid #e5e5e7",
                                        backgroundColor: "#ffffff",
                                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: 1,
                                        "&:hover": {
                                            borderColor: "#d2d2d7",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                        },
                                    }}
                                    aria-label="Salário Líquido CLT"
                                >
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: "#86868b",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                            fontWeight: 600,
                                            mb: 1, 
                                            display: "block" 
                                        }}
                                    >
                                        Salário Líquido CLT
                                    </Typography>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            fontWeight: 700, 
                                            color: "#1d1d1f",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        }}
                                    >
                                        {formatReal(result?.salarioLiquidoClt)}
                                    </Typography>
                                    {vantagem === "CLT" && (
                                        <Chip
                                            label="Melhor opção"
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                backgroundColor: "#f0f4ff",
                                                color: "#667eea",
                                                fontWeight: 600,
                                                borderRadius: 8,
                                                border: "1px solid #e5e5e7",
                                            }}
                                        />
                                    )}
                                </Paper>
                            </Box>
                            <Box flex={1}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        border: "1px solid #e5e5e7",
                                        backgroundColor: "#ffffff",
                                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: 1,
                                        "&:hover": {
                                            borderColor: "#d2d2d7",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                        },
                                    }}
                                    aria-label="Salário Líquido PJ"
                                >
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: "#86868b",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                            fontWeight: 600,
                                            mb: 1, 
                                            display: "block" 
                                        }}
                                    >
                                        Salário Líquido PJ
                                    </Typography>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            fontWeight: 700, 
                                            color: "#1d1d1f",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        }}
                                    >
                                        {formatReal(result?.salarioLiquidoPj)}
                                    </Typography>
                                    {vantagem === "PJ" && (
                                        <Chip
                                            label="Melhor opção"
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                backgroundColor: "#e8f5e8",
                                                color: "#4CAF50",
                                                fontWeight: 600,
                                                borderRadius: 8,
                                                border: "1px solid #e5e5e7",
                                            }}
                                        />
                                    )}
                                </Paper>
                            </Box>
                        </Stack>
                    </Slide>

                    {/* Informações Adicionais */}
                    <Fade in timeout={1200}>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
                            <Box flex={1}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        border: "1px solid #e5e5e7",
                                        backgroundColor: "#fafafa",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                    }}
                                    aria-label="Provisão de Benefícios CLT"
                                >
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: "#86868b",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                            fontWeight: 600,
                                            display: "block", 
                                            mb: 0.5 
                                        }}
                                    >
                                        Provisão de Benefícios CLT
                                    </Typography>
                                    <Typography 
                                        variant="h5" 
                                        sx={{ 
                                            fontWeight: 700, 
                                            color: "#1d1d1f",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        }}
                                    >
                                        {formatReal(result?.provisaoBeneficios)}
                                    </Typography>
                                </Paper>
                            </Box>
                            <Box flex={1}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        background: "linear-gradient(135deg, #FFB74D 0%, #FF9800 100%)",
                                        color: "#ffffff",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                    }}
                                    aria-label="Reserva Emergência Sugerida PJ"
                                >
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            opacity: 0.9,
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                            fontWeight: 600,
                                            display: "block", 
                                            mb: 0.5 
                                        }}
                                    >
                                        <SavingsIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                        Reserva Emergência Sugerida PJ
                                    </Typography>
                                    <Typography 
                                        variant="h5" 
                                        sx={{ 
                                            fontWeight: 700,
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        }}
                                    >
                                        {formatReal(result?.valorReservaSugerido)}
                                    </Typography>
                                </Paper>
                            </Box>
                        </Stack>
                    </Fade>

                    {/* Análise Automática */}
                    <Fade in timeout={1400}>
                        <Box
                            sx={{
                                backgroundColor: "#f5f5f7",
                                p: 3,
                                borderRadius: 3,
                                border: "1px solid #e5e5e7",
                            }}
                            aria-label="Análise automática"
                        >
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: "#86868b",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    fontWeight: 600, 
                                    mb: 1 
                                }}
                            >
                                💡 Análise Automática
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: "#1d1d1f",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    lineHeight: 1.6,
                                }}
                            >
                                {vantagem === "PJ"
                                    ? `O regime PJ oferece ${formatReal(valorVantagem)} a mais por mês. Considere os custos com contabilidade e a ausência de benefícios trabalhistas.`
                                    : `O regime CLT oferece ${formatReal(valorVantagem)} a mais por mês quando considerados todos os benefícios e a segurança jurídica.`
                                }
                            </Typography>
                        </Box>
                    </Fade>
                </Paper>
            </Zoom>

            {/* Gráfico */}
            <Box mb={4}>
                <SimulacaoGrafico result={result} />
            </Box>

            {/* Comparativo Detalhado */}
            {result?.comparativoDetalhado && (
                <Box mb={4}>
                    <SimulacaoComparativoDetalhado detalhado={result.comparativoDetalhado} />
                </Box>
            )}

            {/* Exportar */}
            <SimulacaoExportar result={result} />
        </Box>
    );
}