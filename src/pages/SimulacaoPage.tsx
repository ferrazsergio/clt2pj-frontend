import React, { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
    Divider,
    InputAdornment,
    Container,
    Alert,
    CircularProgress,
    Fade,
    Zoom,
    Slide,
    Tooltip,
    styled,
    alpha,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import CalculateIcon from "@mui/icons-material/Calculate";
import SaveIcon from "@mui/icons-material/Save";
import type { BeneficioDTO } from "../types/BeneficioDTO";
import type { SimulacaoRequestDTO } from "../types/SimulacaoRequestDTO";
import { simularApi, salvarSimulacaoApi } from "../api/simulacao";
import SimulacaoResultado from "../components/SimulacaoResultado.tsx";
import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO.ts";
import BeneficioSelector from "../components/BeneficioSelector";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Apple-style TextField com transições suaves
const AppleTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 12,
        backgroundColor: "#ffffff",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            backgroundColor: "#fafafa",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha(theme.palette.primary.main, 0.3),
            },
        },
        "&.Mui-focused": {
            backgroundColor: "#ffffff",
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
            },
        },
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#d2d2d7",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "& input": {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
        fontSize: "1rem",
        fontWeight: 400,
        color: "#1d1d1f",
        background: "#fff !important",
        WebkitBoxShadow: "0 0 0 100px #fff inset !important",
        WebkitTextFillColor: "#1d1d1f !important",
    },
    "& .MuiInputLabel-root": {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
        fontWeight: 500,
    },
    // Fix fundo preto do autofill (extra para garantir)
    "& input:-webkit-autofill, & input:-webkit-autofill:focus, & input:-webkit-autofill:hover": {
        WebkitBoxShadow: "0 0 0 100px #fff inset !important",
        boxShadow: "0 0 0 100px #fff inset !important",
        background: "#fff !important",
        WebkitTextFillColor: "#1d1d1f !important",
        color: "#1d1d1f !important",
        borderRadius: "12px !important",
        transition: "background 0.18s",
    },
}));

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

function toCentavos(valor: string) {
    if (!valor) return 0;
    const cleaned = valor.replace(/\D/g, "");
    const num = Number(cleaned) / 100;
    return isNaN(num) ? 0 : Math.round(num * 100);
}

function formatarMoeda(valor: string) {
    const somenteNumeros = valor.replace(/\D/g, "");
    if (!somenteNumeros) return "";
    const num = Number(somenteNumeros) / 100;
    return num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

// Função para calcular o total de benefícios
function calcularTotalBeneficios(beneficios: BeneficioDTO[]): number {
    return beneficios.reduce((total, beneficio) => {
        const valor = typeof beneficio.valor === "string" 
            ? toCentavos(beneficio.valor) / 100
            : beneficio.valor || 0;
        return total + valor;
    }, 0);
}

const tipoTributacaoOptions = [
    "MEI",
    "Simples Nacional",
    "Lucro Presumido",
    "Lucro Real"
];

function isMoedaValid(valor: string) {
    return !!valor && toCentavos(valor) > 0;
}

export default function SimulacaoPage() {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [mounted, setMounted] = useState(false);

    const [salarioClt, setSalarioClt] = useState<string>("");
    const [beneficiosClt, setBeneficiosClt] = useState<BeneficioDTO[]>([]);
    const [salarioPj, setSalarioPj] = useState<string>("");
    const [tipoTributacao, setTipoTributacao] = useState<string>("Simples Nacional");
    const [beneficiosPj, setBeneficiosPj] = useState<BeneficioDTO[]>([]);
    const [reservaEmergencia, setReservaEmergencia] = useState<number>(10);
    const [result, setResult] = useState<SimulacaoResponseDTO | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [apiError, setApiError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    const handleReset = () => {
        setSalarioClt("");
        setSalarioPj("");
        setTipoTributacao("Simples Nacional");
        setBeneficiosClt([]);
        setBeneficiosPj([]);
        setReservaEmergencia(10);
        setResult(null);
        setError("");
        setApiError(null);
        setSaveSuccess(false);
    };

    const isFormValid =
        isMoedaValid(salarioClt) &&
        isMoedaValid(salarioPj) &&
        reservaEmergencia >= 0 &&
        reservaEmergencia <= 100 &&
        tipoTributacao;

    const handleSalarioCltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSalarioClt(formatarMoeda(e.target.value));
    };

    const handleSalarioPjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSalarioPj(formatarMoeda(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setApiError(null);
        setSaveSuccess(false);
        
        try {
            if (!isFormValid) {
                setError("Preencha todos os campos corretamente.");
                setLoading(false);
                return;
            }

            // Processar benefícios garantindo que os valores sejam números
            const beneficiosCltProcessados = beneficiosClt.map(b => ({
                ...b,
                valor: typeof b.valor === "string"
                    ? toCentavos(b.valor) / 100
                    : b.valor || 0
            }));

            const beneficiosPjProcessados = beneficiosPj.map(b => ({
                ...b,
                valor: typeof b.valor === "string"
                    ? toCentavos(b.valor) / 100
                    : b.valor || 0
            }));

            // Calcular totais para debug
            const totalBeneficiosPj = calcularTotalBeneficios(beneficiosPj);
            console.log("📊 Total de benefícios PJ:", totalBeneficiosPj);

            const dto: SimulacaoRequestDTO = {
                salarioClt: toCentavos(salarioClt) / 100,
                beneficiosClt: beneficiosCltProcessados,
                salarioPj: toCentavos(salarioPj) / 100,
                tipoTributacao,
                beneficiosPj: beneficiosPjProcessados,
                reservaEmergencia,
                beneficiosSelecionados: [
                    ...beneficiosCltProcessados.map(b => b.nome),
                    ...beneficiosPjProcessados.map(b => b.nome)
                ]
            };

            console.log("📤 Enviando para API:", {
                ...dto,
                totalBeneficiosPj: totalBeneficiosPj,
                beneficiosPjDetalhado: beneficiosPjProcessados
            });

            const response = await simularApi(dto);
            
            if (!response || typeof response !== "object" || !("salarioLiquidoClt" in response)) {
                throw new Error("Resposta inválida do servidor.");
            }

            // Verificar se os benefícios PJ foram subtraídos corretamente
            console.log("📥 Resposta da API:", response);
            
            // Se a API não estiver subtraindo os benefícios PJ, fazer isso manualmente
            let salarioLiquidoPjAjustado = response.salarioLiquidoPj;
            
            // Verificar se precisamos subtrair manualmente os benefícios PJ
            if (totalBeneficiosPj > 0) {
                // Se o salário líquido PJ não foi reduzido pelos benefícios, subtrair manualmente
                const salarioBrutoPj = toCentavos(salarioPj) / 100;
                const possivelSalarioSemBeneficios = salarioLiquidoPjAjustado + totalBeneficiosPj;
                
                // Se o salário líquido + benefícios não faz sentido, é provável que os benefícios não foram subtraídos
                if (Math.abs(possivelSalarioSemBeneficios - salarioBrutoPj) < Math.abs(salarioLiquidoPjAjustado - salarioBrutoPj)) {
                    console.log("⚠️ Benefícios PJ não foram subtraídos pela API, subtraindo manualmente");
                    salarioLiquidoPjAjustado = response.salarioLiquidoPj - totalBeneficiosPj;
                }
            }

            const resultadoAjustado = {
                ...response,
                salarioLiquidoPj: salarioLiquidoPjAjustado,
                // Também ajustar outros campos relacionados se necessário
                totalBeneficiosPj: totalBeneficiosPj,
                beneficiosPjDetalhado: beneficiosPjProcessados
            };

            console.log("✅ Resultado final ajustado:", resultadoAjustado);
            setResult(resultadoAjustado);

        } catch (err: unknown) {
            const error = err as { message?: string };
            console.error("❌ Erro na simulação:", error);
            setApiError(error?.message || "Erro ao realizar simulação.");
        }
        setLoading(false);
    };

    // FUNÇÃO PARA SALVAR SIMULAÇÃO
    const handleSalvarSimulacao = async () => {
        if (!result || !user || !token) {
            setApiError("Não é possível salvar: usuário não autenticado.");
            return;
        }

        setSaving(true);
        setApiError(null);
        try {
            // Corrigir valorReservaSugerido para caso venha 0 ou indefinido
            const valorReservaSugerido =
                (result.valorReservaSugerido !== undefined && result.valorReservaSugerido !== null && result.valorReservaSugerido > 0)
                    ? result.valorReservaSugerido
                    : (result.provisaoBeneficios !== undefined && result.provisaoBeneficios !== null)
                        ? result.provisaoBeneficios
                        : 0;

            const simulacaoParaSalvar = {
                usuario: { id: user.id, email: user.email, papeis: user.papeis },
                salarioClt: result.salarioLiquidoClt,
                salarioPj: result.salarioLiquidoPj,
                beneficios: JSON.stringify({
                    clt: beneficiosClt,
                    pj: beneficiosPj,
                    tipoTributacao: tipoTributacao,
                    reservaEmergencia: reservaEmergencia
                }),
                resultadoComparativo: `CLT: ${result.salarioLiquidoClt} | PJ: ${result.salarioLiquidoPj} | Vantagem: ${result.salarioLiquidoPj > result.salarioLiquidoClt ? 'PJ' : 'CLT'}`,
                dataCriacao: new Date().toISOString(),
                totalBeneficiosClt: calcularTotalBeneficios(beneficiosClt),
                totalBeneficiosPj: calcularTotalBeneficios(beneficiosPj),
                beneficiosSelecionadosClt: beneficiosClt.map(b => b.nome),
                beneficiosSelecionadosPj: beneficiosPj.map(b => b.nome),
                reservaEmergencia: reservaEmergencia,
                valorReservaSugerido: valorReservaSugerido,
                tipoTributacao: tipoTributacao
            };

            console.log("📝 Salvando simulação:", simulacaoParaSalvar);

            await salvarSimulacaoApi(simulacaoParaSalvar, token);

            setSaveSuccess(true);
            setApiError(null);

            // Auto-hide success message after 3 seconds
            setTimeout(() => setSaveSuccess(false), 3000);

        } catch (error: any) {
            console.error("❌ Erro ao salvar simulação:", error);
            setApiError("Erro ao salvar simulação: " + (error.message || "Tente novamente"));
            setSaveSuccess(false);
        } finally {
            setSaving(false);
        }
    };

    // Calcular totais para exibir no preview
    const totalBeneficiosClt = calcularTotalBeneficios(beneficiosClt);
    const totalBeneficiosPj = calcularTotalBeneficios(beneficiosPj);

    return (
        <>
            <style>
            {`
              input:-webkit-autofill,
              input:-webkit-autofill:focus,
              input:-webkit-autofill:hover,
              textarea:-webkit-autofill,
              textarea:-webkit-autofill:focus,
              textarea:-webkit-autofill:hover,
              select:-webkit-autofill,
              select:-webkit-autofill:focus,
              select:-webkit-autofill:hover {
                -webkit-box-shadow: 0 0 0 100px #fff inset !important;
                box-shadow: 0 0 0 100px #fff inset !important;
                background: #fff !important;
                -webkit-text-fill-color: #1d1d1f !important;
                color: #1d1d1f !important;
                border-radius: 12px !important;
                transition: background 0.18s;
              }
            `}
            </style>
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100vw",
                    bgcolor: "#fafafa",
                    py: { xs: 3, md: 6 },
                }}
            >
                <Container maxWidth="lg">
                    {/* Header com botões */}
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
                                        disabled={loading}
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
                            {result && (
                                <Fade in={!!result} timeout={300}>
                                    <Tooltip title="Recomeçar simulação" arrow placement="bottom">
                                        <span>
                                            <AppleButton
                                                startIcon={<ReplayIcon />}
                                                variant="outlined"
                                                onClick={handleReset}
                                                disabled={loading || saving}
                                                sx={{
                                                    borderColor: "#d2d2d7",
                                                    color: "#1d1d1f",
                                                    "&:hover": {
                                                        borderColor: "#86868b",
                                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                    },
                                                }}
                                            >
                                                Recomeçar
                                            </AppleButton>
                                        </span>
                                    </Tooltip>
                                </Fade>
                            )}
                        </Box>
                    </Slide>

                    {/* Card principal do formulário */}
                    <Zoom in={mounted} timeout={600}>
                        <Paper 
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 5 },
                                maxWidth: 680,
                                mx: "auto",
                                borderRadius: 4,
                                border: "1px solid #e5e5e7",
                                mb: 4,
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
                                    Simulação CLT vs PJ
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: "#86868b",
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    }}
                                >
                                    Compare e descubra qual regime é mais vantajoso para você
                                </Typography>
                            </Box>

                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                }}
                            >
                                {/* Seção CLT */}
                                <Box>
                                    <Typography 
                                        variant="overline" 
                                        sx={{ 
                                            color: "#86868b",
                                            fontWeight: 600,
                                            letterSpacing: 1,
                                            display: "block",
                                            mb: 2,
                                        }}
                                    >
                                        Regime CLT
                                    </Typography>
                                    <AppleTextField
                                        label="Salário Bruto"
                                        type="text"
                                        value={salarioClt}
                                        onChange={handleSalarioCltChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                            inputMode: "numeric"
                                        }}
                                        placeholder="0,00"
                                        required
                                        fullWidth
                                        autoFocus
                                        error={!isMoedaValid(salarioClt) && salarioClt.length > 0}
                                        helperText={
                                            isMoedaValid(salarioClt) 
                                                ? "Valor antes dos descontos de impostos e INSS" 
                                                : salarioClt.length > 0 ? "Digite um valor válido maior que zero" : ""
                                        }
                                    />
                                    <Box sx={{ mt: 2 }}>
                                        <BeneficioSelector
                                            beneficios={beneficiosClt}
                                            setBeneficios={setBeneficiosClt}
                                            label="Benefícios CLT"
                                        />
                                        {totalBeneficiosClt > 0 && (
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    color: "#4CAF50",
                                                    fontWeight: 600,
                                                    mt: 1,
                                                    display: "block"
                                                }}
                                            >
                                                Total em benefícios CLT: R$ {totalBeneficiosClt.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>

                                {/* Divisor elegante */}
                                <Box sx={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: 2,
                                    my: 2,
                                }}>
                                    <Divider sx={{ flex: 1, borderColor: "#e5e5e7" }} />
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: "#86868b",
                                            fontWeight: 600,
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 2,
                                            bgcolor: "#f5f5f7",
                                        }}
                                    >
                                        VS
                                    </Typography>
                                    <Divider sx={{ flex: 1, borderColor: "#e5e5e7" }} />
                                </Box>

                                {/* Seção PJ */}
                                <Box>
                                    <Typography 
                                        variant="overline" 
                                        sx={{ 
                                            color: "#86868b",
                                            fontWeight: 600,
                                            letterSpacing: 1,
                                            display: "block",
                                            mb: 2,
                                        }}
                                    >
                                        Regime PJ
                                    </Typography>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        <AppleTextField
                                            label="Valor do Contrato"
                                            type="text"
                                            value={salarioPj}
                                            onChange={handleSalarioPjChange}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                                inputMode: "numeric"
                                            }}
                                            placeholder="0,00"
                                            required
                                            fullWidth
                                            error={!isMoedaValid(salarioPj) && salarioPj.length > 0}
                                            helperText={
                                                !isMoedaValid(salarioPj) && salarioPj.length > 0 
                                                    ? "Digite um valor válido maior que zero" 
                                                    : ""
                                            }
                                        />
                                        <AppleTextField
                                            select
                                            label="Tipo de Tributação"
                                            value={tipoTributacao}
                                            onChange={e => setTipoTributacao(e.target.value)}
                                            required
                                            fullWidth
                                        >
                                            {tipoTributacaoOptions.map(opt => (
                                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                            ))}
                                        </AppleTextField>
                                        <AppleTextField
                                            label="Reserva de Emergência"
                                            type="number"
                                            value={reservaEmergencia}
                                            onChange={e => {
                                                const val = Number(e.target.value);
                                                if (val >= 0 && val <= 100 && !isNaN(val)) {
                                                    setReservaEmergencia(val);
                                                    setError("");
                                                } else {
                                                    setError("Digite um valor entre 0 e 100.");
                                                }
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                            }}
                                            inputProps={{ min: 0, max: 100 }}
                                            fullWidth
                                            error={reservaEmergencia < 0 || reservaEmergencia > 100}
                                            helperText={
                                                reservaEmergencia < 0 || reservaEmergencia > 100
                                                    ? "Digite um valor entre 0 e 100"
                                                    : "Percentual recomendado para reserva financeira"
                                            }
                                        />
                                        <BeneficioSelector
                                            beneficios={beneficiosPj}
                                            setBeneficios={setBeneficiosPj}
                                            label="Benefícios PJ (serão descontados do valor líquido)"
                                        />
                                        {totalBeneficiosPj > 0 && (
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    color: "#FF9800",
                                                    fontWeight: 600,
                                                    mt: 1,
                                                    display: "block"
                                                }}
                                            >
                                                Total em benefícios PJ: R$ {totalBeneficiosPj.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                                <br />
                                                <Typography component="span" variant="caption" sx={{ color: "#666", fontSize: "0.7rem" }}>
                                                    Este valor será descontado do seu salário líquido PJ
                                                </Typography>
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>

                                {/* Alertas de erro */}
                                {(error || apiError) && (
                                    <Fade in timeout={300}>
                                        <Alert 
                                            severity={apiError ? "error" : "warning"}
                                            sx={{ 
                                                borderRadius: 3,
                                                "& .MuiAlert-icon": {
                                                    fontSize: 24,
                                                }
                                            }}
                                        >
                                            {apiError || error}
                                        </Alert>
                                    </Fade>
                                )}

                                {/* Preview dos cálculos */}
                                {(isMoedaValid(salarioClt) || isMoedaValid(salarioPj)) && (
                                    <Box sx={{ 
                                        bgcolor: "#f8f9fa", 
                                        p: 2, 
                                        borderRadius: 2,
                                        border: "1px solid #e9ecef"
                                    }}>
                                        <Typography variant="caption" sx={{ color: "#6c757d", fontWeight: 600, mb: 1, display: "block" }}>
                                            PREVIEW DOS VALORES:
                                        </Typography>
                                        {isMoedaValid(salarioClt) && (
                                            <Typography variant="body2" sx={{ color: "#495057", mb: 0.5 }}>
                                                CLT Bruto: R$ {formatarMoeda(salarioClt)} + R$ {totalBeneficiosClt.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (benefícios)
                                            </Typography>
                                        )}
                                        {isMoedaValid(salarioPj) && (
                                            <Typography variant="body2" sx={{ color: "#495057" }}>
                                                PJ Bruto: R$ {formatarMoeda(salarioPj)} - R$ {totalBeneficiosPj.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (benefícios) 
                                                = R$ {((toCentavos(salarioPj) / 100) - totalBeneficiosPj).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} líquido
                                            </Typography>
                                        )}
                                    </Box>
                                )}

                                {/* Botão de submit */}
                                <AppleButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={loading || !isFormValid}
                                    sx={{
                                        mt: 2,
                                        py: 1.75,
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "#ffffff",
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #5568d3 0%, #6a3f91 100%)",
                                        },
                                        "&.Mui-disabled": {
                                            background: "#e5e5e7",
                                            color: "#86868b",
                                        },
                                    }}
                                >
                                    {loading ? (
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                                            <span>Calculando...</span>
                                        </Box>
                                    ) : (
                                        "Calcular Simulação"
                                    )}
                                </AppleButton>
                            </Box>
                        </Paper>
                    </Zoom>

                    {/* Resultado */}
                    {result && (
                        <Fade in timeout={500}>
                            <Box sx={{ maxWidth: 1000, mx: "auto" }}>
                                {/* Botão de Salvar e Alertas */}
                                <Box sx={{ mb: 3 }}>
                                    {saveSuccess && (
                                        <Fade in timeout={300}>
                                            <Alert 
                                                severity="success"
                                                sx={{ 
                                                    borderRadius: 3,
                                                    mb: 2,
                                                    "& .MuiAlert-icon": {
                                                        fontSize: 24,
                                                    }
                                                }}
                                            >
                                                ✅ Simulação salva com sucesso!
                                            </Alert>
                                        </Fade>
                                    )}
                                    
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Tooltip title="Salvar esta simulação no seu histórico" arrow placement="top">
                                            <span>
                                                <AppleButton
                                                    variant="contained"
                                                    startIcon={<SaveIcon />}
                                                    onClick={handleSalvarSimulacao}
                                                    disabled={saving || !user || !token}
                                                    sx={{
                                                        background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
                                                        color: "#ffffff",
                                                        minWidth: 200,
                                                        "&:hover": {
                                                            background: "linear-gradient(135deg, #45a049 0%, #3d8b40 100%)",
                                                        },
                                                        "&.Mui-disabled": {
                                                            background: "#e5e5e7",
                                                            color: "#86868b",
                                                        },
                                                    }}
                                                >
                                                    {saving ? (
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <CircularProgress size={20} sx={{ color: "#ffffff" }} />
                                                            <span>Salvando...</span>
                                                        </Box>
                                                    ) : (
                                                        "Salvar Simulação"
                                                    )}
                                                </AppleButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                
                                <SimulacaoResultado result={result} />
                            </Box>
                        </Fade>
                    )}
                </Container>
            </Box>
        </>
    );
}