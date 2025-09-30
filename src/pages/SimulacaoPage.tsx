import React, { useState } from "react";
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
    Tooltip,
    styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import type { BeneficioDTO } from "../types/BeneficioDTO";
import type { SimulacaoRequestDTO } from "../types/SimulacaoRequestDTO";
import { simularApi } from "../api/simulacao";
import SimulacaoResultado from "../components/SimulacaoResultado.tsx";
import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO.ts";
import BeneficioSelector from "../components/BeneficioSelector";
import { useNavigate } from "react-router-dom";

// Autofill fix: fundo branco, texto preto, radius Apple-like
const StyledTextField = styled(TextField)(({ theme }) => ({
    "& input, & .MuiInputBase-input": {
        background: "#fff !important",
        WebkitBoxShadow: "0 0 0 100px #fff inset !important",
        boxShadow: "0 0 0 100px #fff inset !important",
        WebkitTextFillColor: "#1d1d1f !important",
        color: "#1d1d1f",
        borderRadius: 12,
        fontFamily: "'SF Pro Display', 'Inter', 'Roboto', 'Arial', sans-serif"
    },
    "&:-webkit-autofill": {
        background: "#fff !important",
        WebkitBoxShadow: "0 0 0 100px #fff inset !important",
        boxShadow: "0 0 0 100px #fff inset !important",
        WebkitTextFillColor: "#1d1d1f !important",
        color: "#1d1d1f !important",
        borderRadius: 12,
    },
    background: "#fff",
    borderRadius: 12,
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

    const [salarioClt, setSalarioClt] = useState<string>("");
    const [beneficiosClt, setBeneficiosClt] = useState<BeneficioDTO[]>([]);
    const [salarioPj, setSalarioPj] = useState<string>("");
    const [tipoTributacao, setTipoTributacao] = useState<string>("Simples Nacional");
    const [beneficiosPj, setBeneficiosPj] = useState<BeneficioDTO[]>([]);
    const [reservaEmergencia, setReservaEmergencia] = useState<number>(10);
    const [result, setResult] = useState<SimulacaoResponseDTO | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [apiError, setApiError] = useState<string | null>(null);

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
        try {
            if (!isFormValid) {
                setError("Preencha todos os campos corretamente.");
                setLoading(false);
                return;
            }
            const dto: SimulacaoRequestDTO = {
                salarioClt: toCentavos(salarioClt) / 100,
                beneficiosClt: beneficiosClt.map(b => ({
                    ...b,
                    valor: typeof b.valor === "string"
                        ? toCentavos(b.valor) / 100
                        : b.valor
                })),
                salarioPj: toCentavos(salarioPj) / 100,
                tipoTributacao,
                beneficiosPj: beneficiosPj.map(b => ({
                    ...b,
                    valor: typeof b.valor === "string"
                        ? toCentavos(b.valor) / 100
                        : b.valor
                })),
                reservaEmergencia,
                beneficiosSelecionados: [
                    ...beneficiosClt.map(b => b.nome),
                    ...beneficiosPj.map(b => b.nome)
                ]
            };

            const response = await simularApi(dto);
            if (!response || typeof response !== "object" || !("salarioLiquidoClt" in response)) {
                throw new Error("Resposta inválida do servidor.");
            }
            setResult(response);
        } catch (err: any) {
            setApiError(err?.message || "Erro ao realizar simulação.");
        }
        setLoading(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                bgcolor: "background.default",
                py: { xs: 3, md: 6 },
                transition: "background 0.25s"
            }}
        >
            <Container maxWidth="lg">
                {/* Botões topo com microinteração */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Fade in>
                        <Tooltip title="Voltar" arrow>
                            <span>
                                <Button
                                    startIcon={<ArrowBackIcon />}
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleBack}
                                    sx={{
                                        fontWeight: 600,
                                        textTransform: "none",
                                        mr: 2,
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
                                    disabled={loading}
                                >
                                    Voltar
                                </Button>
                            </span>
                        </Tooltip>
                    </Fade>
                    {result && (
                        <Fade in>
                            <Tooltip title="Nova Simulação" arrow>
                                <span>
                                    <Button
                                        startIcon={<ReplayIcon />}
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleReset}
                                        sx={{
                                            fontWeight: 600,
                                            textTransform: "none",
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
                                        disabled={loading}
                                    >
                                        Recomeçar
                                    </Button>
                                </span>
                            </Tooltip>
                        </Fade>
                    )}
                </Box>

                <Zoom in>
                    <Paper sx={{
                        p: { xs: 3, md: 4 },
                        maxWidth: 600,
                        mx: "auto",
                        borderRadius: 5,
                        boxShadow: "0 1.5px 16px rgba(0,0,0,0.06)",
                        border: "1.2px solid #e3e8ee",
                        mb: 4,
                        background: "#fff",
                        transition: "box-shadow 0.14s, border 0.13s",
                        "&:hover": {
                            boxShadow: "0 3px 28px rgba(0,0,0,0.11)",
                            border: "1.7px solid #b0b8c9",
                        },
                    }}>
                        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 700, color: "primary.main" }}>
                            Simulação CLT vs PJ
                        </Typography>
                        <Divider sx={{ mb: 3, background: "#e3e8ee" }} />

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            display="flex"
                            flexDirection="column"
                            gap={2.5}
                            sx={{ position: "relative" }}
                            autoComplete="off"
                        >
                            <StyledTextField
                                label="Salário CLT bruto *"
                                helperText={isMoedaValid(salarioClt) ? "Informe o valor bruto, antes dos descontos de impostos e INSS." : "Digite um valor válido maior que zero."}
                                type="text"
                                value={salarioClt}
                                onChange={handleSalarioCltChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    inputMode: "numeric"
                                }}
                                placeholder="0,00"
                                required
                                size="small"
                                autoFocus
                                error={!isMoedaValid(salarioClt) && salarioClt.length > 0}
                            />
                            <BeneficioSelector
                                beneficios={beneficiosClt}
                                setBeneficios={setBeneficiosClt}
                                label="Benefícios CLT"
                            />

                            {/* LINHA PONTILHADA ENTRE CLT E PJ */}
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                my: 2.5,
                                width: "100%",
                            }}>
                                <Box sx={{
                                    flex: 1,
                                    height: 1,
                                    borderBottom: "2px dashed #e3e8ee",
                                    mr: 1.5,
                                }} />
                                <Typography variant="body2" sx={{
                                    color: "#6e6e73",
                                    fontWeight: 500,
                                    background: "#fff",
                                    px: 1.2,
                                    borderRadius: 8,
                                    boxShadow: "0 1px 8px rgba(0,0,0,0.03)",
                                }}>
                                    Comparar com PJ
                                </Typography>
                                <Box sx={{
                                    flex: 1,
                                    height: 1,
                                    borderBottom: "2px dashed #e3e8ee",
                                    ml: 1.5,
                                }} />
                            </Box>

                            <StyledTextField
                                label="Salário PJ *"
                                type="text"
                                value={salarioPj}
                                onChange={handleSalarioPjChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    inputMode: "numeric"
                                }}
                                placeholder="0,00"
                                required
                                size="small"
                                error={!isMoedaValid(salarioPj) && salarioPj.length > 0}
                                helperText={isMoedaValid(salarioPj) ? "" : "Digite um valor válido maior que zero."}
                            />
                            <StyledTextField
                                select
                                label="Tipo de Tributação PJ *"
                                value={tipoTributacao}
                                onChange={e => setTipoTributacao(e.target.value)}
                                required
                                size="small"
                            >
                                {tipoTributacaoOptions.map(opt => (
                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                ))}
                            </StyledTextField>
                            <BeneficioSelector
                                beneficios={beneficiosPj}
                                setBeneficios={setBeneficiosPj}
                                label="Benefícios PJ"
                            />
                            <StyledTextField
                                label="Reserva de Emergência (%)"
                                type="number"
                                value={reservaEmergencia}
                                onChange={e => {
                                    const val = Number(e.target.value);
                                    if (val < 0 || val > 100 || isNaN(val)) {
                                        setError("Digite um valor entre 0 e 100.");
                                    } else {
                                        setReservaEmergencia(val);
                                        setError("");
                                    }
                                }}
                                inputProps={{ min: 0, max: 100 }}
                                size="small"
                                error={reservaEmergencia < 0 || reservaEmergencia > 100}
                                helperText={
                                    reservaEmergencia < 0 || reservaEmergencia > 100
                                        ? "Digite um valor entre 0 e 100."
                                        : "Percentual sugerido de reserva."
                                }
                            />
                            {/* Erros do formulário */}
                            <Fade in={!!error}>
                                <Box>
                                    {error && (
                                        <Alert severity="warning" sx={{ my: 0 }}>
                                            {error}
                                        </Alert>
                                    )}
                                </Box>
                            </Fade>
                            {/* Erros da API */}
                            <Fade in={!!apiError}>
                                <Box>
                                    {apiError && (
                                        <Alert severity="error" sx={{ my: 0 }}>
                                            {apiError}
                                        </Alert>
                                    )}
                                </Box>
                            </Fade>
                            {/* Botão com animação de loading */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                disabled={loading || !isFormValid}
                                sx={{
                                    mt: 1,
                                    boxShadow: "none",
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                    borderRadius: "14px",
                                    background: "#fff",
                                    color: "primary.main",
                                    border: "1.5px solid #e3e8ee",
                                    transition: "background 0.14s, box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                                    "&:hover": {
                                        background: "#f5f5f7",
                                        borderColor: "#b0b8c9",
                                        color: "primary.main",
                                        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                                        transform: "scale(1.01)",
                                    },
                                    "&:active": {
                                        background: "#e8e8ed",
                                        color: "primary.main",
                                        borderColor: "#b0b8c9",
                                    },
                                    "&.Mui-disabled": {
                                        background: "#f5f5f7",
                                        color: "#b0b8c9",
                                        borderColor: "#e3e8ee",
                                        cursor: "not-allowed",
                                    },
                                }}
                            >
                                {loading ? (
                                    <Fade in={loading}>
                                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                            <CircularProgress size={24} color="inherit" />
                                            Calculando...
                                        </Box>
                                    </Fade>
                                ) : (
                                    "Simular"
                                )}
                            </Button>
                        </Box>
                    </Paper>
                </Zoom>

                {/* Resultado com animação, espaçamento, proteção visual */}
                {result && (
                    <Zoom in>
                        <Box sx={{ maxWidth: 900, mx: "auto", mb: 4 }}>
                            {/* SimulacaoResultado: ajuste os cards para serem ultra clean, cores suaves, shadow leve, radius 20px, tipografia Apple-like */}
                            <SimulacaoResultado result={result} />
                        </Box>
                    </Zoom>
                )}
            </Container>
        </Box>
    );
}