import React, { useState } from "react";
import {
    Box, Paper, Typography, TextField, MenuItem, Button, Divider
} from "@mui/material";
import type {BeneficioDTO} from "../types/BeneficioDTO";
import type {SimulacaoRequestDTO} from "../types/SimulacaoRequestDTO";
import { simularApi } from "../api/simulacao";
import SimulacaoResultado from "../components/SimulacaoResultado.tsx";
import type {SimulacaoResponseDTO} from "../types/SimulacaoResponseDTO.ts";

const BENEFICIOS_PADRAO = [
    { nome: "VT", descricao: "Vale Transporte" },
    { nome: "VR", descricao: "Vale Refeição" },
    { nome: "VA", descricao: "Vale Alimentação" },
    { nome: "Plano de Saúde", descricao: "Plano de Saúde empresarial" },
    { nome: "Plano Odontológico", descricao: "Plano Odontológico empresarial" },
    { nome: "Outro", descricao: "Outro benefício" },
];

function BeneficioSelector({
                               beneficios, setBeneficios, label
                           }: {
    beneficios: BeneficioDTO[];
    setBeneficios: (beneficios: BeneficioDTO[]) => void;
    label: string;
}) {
    const [selected, setSelected] = useState<string[]>([]);
    const [outroNome, setOutroNome] = useState("");
    const [outroValor, setOutroValor] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string[] = typeof event.target.value === "string"
            ? event.target.value.split(",")
            : event.target.value;

        setSelected(value);

        const novosBeneficios = value
            .filter(nome => nome !== "Outro")
            .map(nome => ({
                nome,
                valor: 0
            }));
        setBeneficios(novosBeneficios);
    };

    const handleAddOutro = () => {
        if (outroNome && outroValor > 0) {
            setBeneficios([
                ...beneficios,
                {
                    nome: outroNome,
                    valor: outroValor
                }
            ]);
            setSelected([...selected, outroNome]);
            setOutroNome("");
            setOutroValor(0);
        }
    };

    return (
        <Box mb={2}>
            <TextField
                select
                label={label}
                SelectProps={{ multiple: true }}
                value={selected}
                onChange={handleChange}
                fullWidth
                size="small"
            >
                {BENEFICIOS_PADRAO.map((b) => (
                    <MenuItem key={b.nome} value={b.nome}>
                        {b.nome}
                    </MenuItem>
                ))}
            </TextField>

            {selected.includes("Outro") && (
                <Box mt={2} display="flex" gap={2}>
                    <TextField
                        label="Nome do benefício"
                        value={outroNome}
                        onChange={e => setOutroNome(e.target.value)}
                        size="small"
                    />
                    <TextField
                        label="Valor (R$)"
                        type="number"
                        value={outroValor}
                        onChange={e => setOutroValor(Number(e.target.value))}
                        size="small"
                    />
                    <Button variant="contained" onClick={handleAddOutro}>Adicionar</Button>
                </Box>
            )}
            <Box mt={1}>
                {beneficios.map(b => (
                    <Typography key={b.nome} variant="body2">
                        {b.nome}: R$ {b.valor}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
}

export default function SimulacaoPage() {
    const [salarioClt, setSalarioClt] = useState<number>(0);
    const [beneficiosClt, setBeneficiosClt] = useState<BeneficioDTO[]>([]);
    const [salarioPj, setSalarioPj] = useState<number>(0);
    const [tipoTributacao, setTipoTributacao] = useState<string>("Simples Nacional");
    const [beneficiosPj, setBeneficiosPj] = useState<BeneficioDTO[]>([]);
    const [reservaEmergencia, setReservaEmergencia] = useState<number>(10);
    const [result, setResult] = useState<SimulacaoResponseDTO | null>(null); // <--- corrigido!
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const tipoTributacaoOptions = [
        "MEI",
        "Simples Nacional",
        "Lucro Presumido",
        "Lucro Real"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const dto: SimulacaoRequestDTO = {
                salarioClt,
                beneficiosClt,
                salarioPj,
                tipoTributacao,
                beneficiosPj,
                reservaEmergencia,
                beneficiosSelecionados: [
                    ...beneficiosClt.map(b => b.nome),
                    ...beneficiosPj.map(b => b.nome)
                ]
            };
            const response = await simularApi(dto);
            setResult(response);
        } catch (err: any) {
            setError("Erro ao realizar simulação.");
        }
        setLoading(false);
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Simulação CLT vs PJ
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Salário CLT (R$)"
                    type="number"
                    value={salarioClt}
                    onChange={e => setSalarioClt(Number(e.target.value))}
                    required
                    inputProps={{ min: 0 }}
                    size="small"
                />
                <BeneficioSelector
                    beneficios={beneficiosClt}
                    setBeneficios={setBeneficiosClt}
                    label="Benefícios CLT"
                />
                <TextField
                    label="Salário PJ (R$)"
                    type="number"
                    value={salarioPj}
                    onChange={e => setSalarioPj(Number(e.target.value))}
                    required
                    inputProps={{ min: 0 }}
                    size="small"
                />
                <TextField
                    select
                    label="Tipo de Tributação PJ"
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
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? "Calculando..." : "Simular"}
                </Button>
                {error && <Typography color="error">{error}</Typography>}
            </Box>

            {result && (
                <Box mt={4}>
                    <SimulacaoResultado result={result} />
                </Box>
            )}
        </Paper>
    );
}