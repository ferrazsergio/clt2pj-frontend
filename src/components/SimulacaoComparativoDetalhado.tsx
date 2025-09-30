import type { BeneficiosDetalhado } from "../types/SimulacaoResponseDTO";
import { Box, Paper, Typography, Divider, Stack, Chip, Tooltip, Fade, Zoom } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

function formatReal(valor: number | undefined | null) {
    const num = Number(valor);
    if (isNaN(num) || valor === undefined || valor === null) return "R$ 0,00";
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function SimulacaoComparativoDetalhado({ detalhado }: { detalhado: BeneficiosDetalhado | null | undefined }) {
    if (!detalhado) return null;

    return (
        <Zoom in timeout={600}>
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
                {/* Header */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
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
                        <TrendingUpIcon sx={{ fontSize: 24, color: "#667eea" }} />
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
                        Comparativo Detalhado
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: "#86868b",
                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                        }}
                    >
                        Análise completa dos regimes CLT e PJ
                    </Typography>
                </Box>

                <Divider sx={{ mb: 4, borderColor: "#e5e5e7" }} />

                <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                    {/* CLT */}
                    <Box flex={1}>
                        <Fade in timeout={800}>
                            <Box>
                                <Box
                                    sx={{
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "#ffffff",
                                        px: 3,
                                        py: 2,
                                        borderRadius: 3,
                                        mb: 3,
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                        textAlign: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                    }}
                                >
                                    <WorkspacePremiumIcon sx={{ fontSize: 20 }} />
                                    CLT
                                </Box>
                                <Stack spacing={2.5}>
                                    <Box>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: "#86868b",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                fontWeight: 600,
                                                display: "block", 
                                                mb: 1,
                                            }}
                                        >
                                            Salário Líquido
                                        </Typography>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                fontWeight: 700, 
                                                color: "#1d1d1f",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                            }}
                                        >
                                            {formatReal(detalhado.clt?.salarioLiquido)}
                                        </Typography>
                                    </Box>
                                    
                                    <Divider sx={{ borderColor: "#e5e5e7" }} />
                                    
                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    color: "#86868b",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                    display: "block", 
                                                    mb: 0.5,
                                                }}
                                            >
                                                INSS
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 600, 
                                                    color: "#1d1d1f",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                }}
                                            >
                                                {formatReal(detalhado.clt?.inss)}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    color: "#86868b",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                    display: "block", 
                                                    mb: 0.5,
                                                }}
                                            >
                                                IRRF
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 600, 
                                                    color: "#1d1d1f",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                }}
                                            >
                                                {formatReal(detalhado.clt?.irrf)}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    color: "#86868b",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                    display: "block", 
                                                    mb: 0.5,
                                                }}
                                            >
                                                Total Benefícios
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 600, 
                                                    color: "#1d1d1f",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                }}
                                            >
                                                {formatReal(detalhado.clt?.totalBeneficios)}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    {detalhado.clt?.beneficiosSelecionados && detalhado.clt.beneficiosSelecionados.length > 0 && (
                                        <Fade in timeout={1000}>
                                            <Box>
                                                <Divider sx={{ borderColor: "#e5e5e7", my: 2 }} />
                                                <Box>
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            color: "#86868b",
                                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                            fontWeight: 600,
                                                            display: "block", 
                                                            mb: 1.5,
                                                        }}
                                                    >
                                                        Benefícios Selecionados
                                                    </Typography>
                                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                                        {detalhado.clt.beneficiosSelecionados.map((b, i) => (
                                                            <Tooltip key={i} title={b} arrow placement="top">
                                                                <Chip
                                                                    label={b}
                                                                    size="small"
                                                                    sx={{
                                                                        cursor: "pointer",
                                                                        backgroundColor: "#f0f4ff",
                                                                        color: "#667eea",
                                                                        borderRadius: 8,
                                                                        fontWeight: 600,
                                                                        border: "1px solid #e5e5e7",
                                                                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                                                        '&:hover': { 
                                                                            transform: "translateY(-1px)",
                                                                            boxShadow: "0 2px 8px rgba(102, 126, 234, 0.2)",
                                                                        }
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        ))}
                                                    </Stack>
                                                </Box>
                                            </Box>
                                        </Fade>
                                    )}
                                </Stack>
                            </Box>
                        </Fade>
                    </Box>

                    {/* Divider vertical em telas maiores */}
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ 
                            display: { xs: "none", md: "block" }, 
                            borderColor: "#e5e5e7" 
                        }}
                    />

                    {/* PJ */}
                    <Box flex={1}>
                        <Fade in timeout={1000}>
                            <Box>
                                <Box
                                    sx={{
                                        background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
                                        color: "#ffffff",
                                        px: 3,
                                        py: 2,
                                        borderRadius: 3,
                                        mb: 3,
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                        textAlign: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                    }}
                                >
                                    <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />
                                    PJ
                                </Box>
                                <Stack spacing={2.5}>
                                    <Box>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: "#86868b",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                fontWeight: 600,
                                                display: "block", 
                                                mb: 1,
                                            }}
                                        >
                                            Salário Líquido
                                        </Typography>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                fontWeight: 700, 
                                                color: "#1d1d1f",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                            }}
                                        >
                                            {formatReal(detalhado.pj?.salarioLiquido)}
                                        </Typography>
                                    </Box>
                                    
                                    <Divider sx={{ borderColor: "#e5e5e7" }} />
                                    
                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    color: "#86868b",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                    display: "block", 
                                                    mb: 0.5,
                                                }}
                                            >
                                                Tipo Tributação
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 600, 
                                                    color: "#1d1d1f",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                }}
                                            >
                                                {detalhado.pj?.tipoTributacao || "—"}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    color: "#86868b",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                    display: "block", 
                                                    mb: 0.5,
                                                }}
                                            >
                                                Reserva Emergência
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 600, 
                                                    color: "#1d1d1f",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                }}
                                            >
                                                {detalhado.pj?.reservaEmergencia !== undefined && detalhado.pj?.reservaEmergencia !== null ? `${detalhado.pj.reservaEmergencia}%` : "—"}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    color: "#86868b",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                    display: "block", 
                                                    mb: 0.5,
                                                }}
                                            >
                                                Total Benefícios
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 600, 
                                                    color: "#1d1d1f",
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                }}
                                            >
                                                {formatReal(detalhado.pj?.totalBeneficios)}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    {detalhado.pj?.beneficiosSelecionados && detalhado.pj.beneficiosSelecionados.length > 0 && (
                                        <Fade in timeout={1200}>
                                            <Box>
                                                <Divider sx={{ borderColor: "#e5e5e7", my: 2 }} />
                                                <Box>
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            color: "#86868b",
                                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                            fontWeight: 600,
                                                            display: "block", 
                                                            mb: 1.5,
                                                        }}
                                                    >
                                                        Benefícios Selecionados
                                                    </Typography>
                                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                                        {detalhado.pj.beneficiosSelecionados.map((b, i) => (
                                                            <Tooltip key={i} title={b} arrow placement="top">
                                                                <Chip
                                                                    label={b}
                                                                    size="small"
                                                                    sx={{
                                                                        cursor: "pointer",
                                                                        backgroundColor: "#e8f5e8",
                                                                        color: "#4CAF50",
                                                                        borderRadius: 8,
                                                                        fontWeight: 600,
                                                                        border: "1px solid #e5e5e7",
                                                                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                                                        '&:hover': { 
                                                                            transform: "translateY(-1px)",
                                                                            boxShadow: "0 2px 8px rgba(76, 175, 80, 0.2)",
                                                                        }
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        ))}
                                                    </Stack>
                                                </Box>
                                            </Box>
                                        </Fade>
                                    )}
                                </Stack>
                            </Box>
                        </Fade>
                    </Box>
                </Stack>

                {detalhado.valorReservaSugerido !== undefined && detalhado.valorReservaSugerido !== null && (
                    <Fade in timeout={1400}>
                        <Box>
                            <Divider sx={{ my: 4, borderColor: "#e5e5e7" }} />
                           <Box
                                sx={{
                                    background: "linear-gradient(135deg, #FFB74D 0%, #FF9800 100%)",
                                    color: "#ffffff",
                                    p: 3,
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    textAlign: "center",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                                    <SavingsIcon sx={{ fontSize: 24 }} />
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            fontWeight: 700,
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        }}
                                    >
                                        Valor Reserva Sugerido
                                    </Typography>
                                </Box>
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        fontWeight: 700,
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                        mb: 1,
                                    }}
                                >
                                    {formatReal(detalhado.valorReservaSugerido)}
                                </Typography>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        opacity: 0.9,
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    }}
                                >
                                    Recomendado para cobrir despesas emergenciais
                                </Typography>
                            </Box>
                        </Box>
                    </Fade>
                )}
            </Paper>
        </Zoom>
    );
}