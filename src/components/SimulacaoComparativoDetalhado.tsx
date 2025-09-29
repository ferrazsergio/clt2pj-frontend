import { Box, Paper, Typography, Divider, Stack, Chip } from "@mui/material";

interface BeneficiosDetalhado {
    clt?: {
        salarioLiquido?: number;
        inss?: number;
        irrf?: number;
        totalBeneficios?: number;
        beneficiosSelecionados?: string[];
    };
    pj?: {
        salarioLiquido?: number;
        tipoTributacao?: string;
        reservaEmergencia?: number;
        totalBeneficios?: number;
        beneficiosSelecionados?: string[];
    };
    valorReservaSugerido?: number;
}

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
                borderRadius: 3,
                boxShadow: "0 4px 24px rgba(33,150,243,0.12)"
            }}
        >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Comparativo Detalhado
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                {/* CLT */}
                <Box flex={1}>
                    <Box
                        sx={{
                            bgcolor: "primary.light",
                            color: "primary.dark",
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            mb: 2
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            CLT
                        </Typography>
                    </Box>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Salário Líquido
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {formatReal(detalhado.clt?.salarioLiquido)}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                INSS
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {formatReal(detalhado.clt?.inss)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                IRRF
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {formatReal(detalhado.clt?.irrf)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Total Benefícios
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
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
                                            <Chip
                                                key={i}
                                                label={b}
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            />
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
                    sx={{ display: { xs: "none", md: "block" } }}
                />

                {/* PJ */}
                <Box flex={1}>
                    <Box
                        sx={{
                            bgcolor: "success.light",
                            color: "success.dark",
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            mb: 2
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            PJ
                        </Typography>
                    </Box>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Salário Líquido
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {formatReal(detalhado.pj?.salarioLiquido)}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Tipo Tributação
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {detalhado.pj?.tipoTributacao || "—"}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Reserva Emergência
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {detalhado.pj?.reservaEmergencia}%
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Total Benefícios
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
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
                                            <Chip
                                                key={i}
                                                label={b}
                                                size="small"
                                                variant="outlined"
                                                color="success"
                                            />
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
                    <Divider sx={{ my: 3 }} />
                    <Box
                        sx={{
                            bgcolor: "warning.light",
                            color: "warning.dark",
                            p: 2.5,
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="caption" display="block" sx={{ fontWeight: 600, mb: 0.5 }}>
                            💡 Valor Reserva Sugerido
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {formatReal(detalhado.valorReservaSugerido)}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            É recomendado manter essa reserva para cobrir despesas emergenciais
                        </Typography>
                    </Box>
                </>
            )}
        </Paper>
    );
}