import React, { useState } from "react";
import {
    Box, Paper, Typography, TextField, MenuItem, Button, Divider, InputAdornment
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { BeneficioDTO } from "../types/BeneficioDTO";
import type { SimulacaoRequestDTO } from "../types/SimulacaoRequestDTO";
import { simularApi } from "../api/simulacao";
import SimulacaoResultado from "../components/SimulacaoResultado.tsx";
import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO.ts";
import BeneficioSelector from "../components/BeneficioSelector";
import { useNavigate } from "react-router-dom";

// Converte string formatada -> número em centavos
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
        try {
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
            setResult(response);
        } catch {
            setError("Erro ao realizar simulação.");
        }
        setLoading(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                bgcolor: "background.default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Paper sx={{
                p: 4,
                maxWidth: 430,
                width: "100%",
                borderRadius: 4,
                boxShadow: "0 4px 24px rgba(33,150,243,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative"
            }}>
                {/* Botão Voltar */}
                <Box sx={{ position: "absolute", left: 24, top: 24 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="text"
                        color="primary"
                        onClick={() => navigate(-1)}
                        sx={{ fontWeight: 600, textTransform: "none" }}
                    >
                        Voltar
                    </Button>
                </Box>
                <Typography variant="h5" gutterBottom align="center" sx={{ mt: 2 }}>
                    Simulação CLT vs PJ
                </Typography>
                <Divider sx={{ mb: 2, width: "100%" }} />
                <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} width="100%">
                    <TextField
                        label="Salário CLT bruto *"
                        helperText="Informe o valor bruto, antes dos descontos de impostos e INSS."
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
                    />
                    <BeneficioSelector
                        beneficios={beneficiosClt}
                        setBeneficios={setBeneficiosClt}
                        label="Benefícios CLT"
                    />
                    <TextField
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
                    />
                    <TextField
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
                    </TextField>
                    <BeneficioSelector
                        beneficios={beneficiosPj}
                        setBeneficios={setBeneficiosPj}
                        label="Benefícios PJ"
                    />
                    <TextField
                        label="Reserva de Emergência (%)"
                        type="number"
                        value={reservaEmergencia}
                        onChange={e => setReservaEmergencia(Number(e.target.value))}
                        inputProps={{ min: 0 }}
                        size="small"
                    />
                    <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={loading}>
                        {loading ? "Calculando..." : "Simular"}
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
                {result && (
                    <Box mt={4} width="100%">
                        <SimulacaoResultado result={result} />
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
