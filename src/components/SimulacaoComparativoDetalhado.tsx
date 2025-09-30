import type { BeneficiosDetalhado } from "../types/SimulacaoResponseDTO";
import { Box, Paper, Typography, Divider, Stack, Chip, Tooltip } from "@mui/material";

function formatReal(valor: number | undefined | null) {
    const num = Number(valor);
    if (isNaN(num) || valor === undefined || valor === null) return "R$ 0,00";
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function SimulacaoComparativoDetalhado({ detalhado }: { detalhado: BeneficiosDetalhado | null | undefined }) {
    if (!detalhado) return null;

    return (
        <Paper
            elevation={3}
            sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                boxShadow: "0 1.5px 16px rgba(0,0,0,0.07)",
                background: "#fff",
                border: "1.2px solid #e3e8ee",
                transition: "box-shadow 0.16s, border 0.13s",
                '&:hover': { boxShadow: "0 3px 28px rgba(0,0,0,0.11)" }
            }}
        >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: "primary.main" }}>
                Comparativo Detalhado
            </Typography>
            <Divider sx={{ mb: 3, background: "#e3e8ee" }} />

            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                {/* CLT */}
                <Box flex={1}>
                    <Box
                        sx={{
                            bgcolor: "#e8f0fa",
                            color: "#0071e3",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            mb: 2,
                            fontWeight: 700,
                            fontSize: "1.08rem",
                            textAlign: "center",
                            boxShadow: "none"
                        }}
                    >
                        CLT
                    </Box>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Salário Líquido
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                                {formatReal(detalhado.clt?.salarioLiquido)}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                INSS
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                                {formatReal(detalhado.clt?.inss)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                IRRF
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                                {formatReal(detalhado.clt?.irrf)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Total Benefícios
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                                {formatReal(detalhado.clt?.totalBeneficios)}
                            </Typography>
                        </Box>
                        {detalhado.clt?.beneficiosSelecionados && detalhado.clt.beneficiosSelecionados.length > 0 && (
                            <>
                                <Divider />
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                        Benefícios Selecionados
                                    </Typography>
                                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                                        {detalhado.clt.beneficiosSelecionados.map((b, i) => (
                                            <Tooltip key={i} title={b} arrow>
                                                <Chip
                                                    label={b}
                                                    size="small"
                                                    variant="outlined"
                                                    color="primary"
                                                    sx={{
                                                        cursor: "pointer",
                                                        background: "#e8f0fa",
                                                        color: "#0071e3",
                                                        borderRadius: 8,
                                                        fontWeight: 500,
                                                        transition: "box-shadow 0.18s",
                                                        '&:hover': { boxShadow: 2, fontWeight: 700 }
                                                    }}
                                                />
                                            </Tooltip>
                                        ))}
                                    </Stack>
                                </Box>
                            </>
                        )}
                    </Stack>
                </Box>

                {/* Divider vertical em telas maiores */}
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ display: { xs: "none", md: "block" }, background: "#e3e8ee" }}
                />

                {/* PJ */}
                <Box flex={1}>
                    <Box
                        sx={{
                            bgcolor: "#e6f4ea",
                            color: "#43a047",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            mb: 2,
                            fontWeight: 700,
                            fontSize: "1.08rem",
                            textAlign: "center",
                            boxShadow: "none"
                        }}
                    >
                        PJ
                    </Box>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Salário Líquido
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#43a047" }}>
                                {formatReal(detalhado.pj?.salarioLiquido)}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Tipo Tributação
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                                {detalhado.pj?.tipoTributacao || "—"}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Reserva Emergência
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                                {detalhado.pj?.reservaEmergencia !== undefined && detalhado.pj?.reservaEmergencia !== null ? `${detalhado.pj.reservaEmergencia}%` : "—"}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Total Benefícios
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                                {formatReal(detalhado.pj?.totalBeneficios)}
                            </Typography>
                        </Box>
                        {detalhado.pj?.beneficiosSelecionados && detalhado.pj.beneficiosSelecionados.length > 0 && (
                            <>
                                <Divider />
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                        Benefícios Selecionados
                                    </Typography>
                                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                                        {detalhado.pj.beneficiosSelecionados.map((b, i) => (
                                            <Tooltip key={i} title={b} arrow>
                                                <Chip
                                                    label={b}
                                                    size="small"
                                                    variant="outlined"
                                                    color="success"
                                                    sx={{
                                                        cursor: "pointer",
                                                        background: "#e6f4ea",
                                                        color: "#43a047",
                                                        borderRadius: 8,
                                                        fontWeight: 500,
                                                        transition: "box-shadow 0.18s",
                                                        '&:hover': { boxShadow: 2, fontWeight: 700 }
                                                    }}
                                                />
                                            </Tooltip>
                                        ))}
                                    </Stack>
                                </Box>
                            </>
                        )}
                    </Stack>
                </Box>
            </Stack>

            {detalhado.valorReservaSugerido !== undefined && detalhado.valorReservaSugerido !== null && (
                <>
                    <Divider sx={{ my: 3, background: "#e3e8ee" }} />
                    <Box
                        sx={{
                            bgcolor: "#fff8e6",
                            color: "#b2741e",
                            p: 2.5,
                            borderRadius: 3,
                            border: "1.2px solid #ffe0b2",
                            fontWeight: 600
                        }}
                    >
                        <Typography variant="caption" display="block" sx={{ fontWeight: 700, mb: 0.5 }}>
                            💡 Valor Reserva Sugerido
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#b2741e" }}>
                            {formatReal(detalhado.valorReservaSugerido)}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 0.5, color: "#b2741e" }}>
                            É recomendado manter essa reserva para cobrir despesas emergenciais
                        </Typography>
                    </Box>
                </>
            )}
        </Paper>
    );
}