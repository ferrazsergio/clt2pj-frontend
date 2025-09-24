import { useState } from "react";
import {
    Autocomplete, TextField, Box, Chip, Typography, Button, Paper, IconButton, Fade, InputAdornment
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommuteIcon from "@mui/icons-material/Commute";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import type { BeneficioDTO } from "../types/BeneficioDTO";

// Labels explicativos para cada benefício
const beneficioLabels: Record<string, string> = {
    VT: "Vale Transporte",
    VR: "Vale Refeição",
    VA: "Vale Alimentação",
    "Plano de Saúde": "Plano de Saúde",
    "Plano Odontológico": "Plano Odontológico",
    Outro: "Outro"
};

const BENEFICIOS_PADRAO = [
    { nome: "VT", icon: <CommuteIcon color="primary" /> },
    { nome: "VR", icon: <RestaurantIcon color="success" /> },
    { nome: "VA", icon: <RestaurantIcon color="warning" /> },
    { nome: "Plano de Saúde", icon: <LocalHospitalIcon color="info" /> },
    { nome: "Plano Odontológico", icon: <LocalHospitalIcon color="secondary" /> },
    { nome: "Outro", icon: <AddCircleOutlineIcon color="action" /> },
];

// 🔧 Função para formatar valores como moeda
function formatarMoeda(valor: string) {
    const somenteNumeros = valor.replace(/\D/g, "");
    if (!somenteNumeros) return "";

    const num = Number(somenteNumeros) / 100;

    return num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

export default function BeneficioSelector({
                                              beneficios,
                                              setBeneficios,
                                              label,
                                          }: {
    beneficios: BeneficioDTO[];
    setBeneficios: (beneficios: BeneficioDTO[]) => void;
    label: string;
}) {
    const [outroNome, setOutroNome] = useState("");
    const [outroValor, setOutroValor] = useState<string>("");

    const selectedNomes = BENEFICIOS_PADRAO
        .filter(padrao =>
            padrao.nome === "Outro"
                ? beneficios.some(b => b.nome === "Outro" || !BENEFICIOS_PADRAO.map(x => x.nome).includes(b.nome))
                : beneficios.some(b => b.nome === padrao.nome)
        )
        .map(b => b.nome);

    // Adiciona/Remove padrão e personalizado
    const handleChange = (_: unknown, values: string[]) => {
        const personalizados = beneficios.filter(
            b => !BENEFICIOS_PADRAO.map(x => x.nome).includes(b.nome) && b.nome !== "Outro"
        );
        const selecionados: BeneficioDTO[] = values
            .filter(nome => nome !== "Outro")
            .map(nome => {
                const existente = beneficios.find(b => b.nome === nome);
                return existente ? existente : { nome, valor: "" };
            });
        if (values.includes("Outro")) {
            selecionados.push({ nome: "Outro", valor: "" });
        }
        setBeneficios([...selecionados, ...personalizados]);
    };

    // Adiciona benefício personalizado
    const handleAddOutro = () => {
        const nomeTrim = outroNome.trim();
        if (nomeTrim && outroValor) {
            setBeneficios([
                ...beneficios.filter(b => b.nome !== nomeTrim),
                { nome: nomeTrim, valor: outroValor },
            ]);
            setOutroNome("");
            setOutroValor("");
        }
    };

    // Edita valor já formatado
    const handleValorChange = (nome: string, valor: string) => {
        const formatado = formatarMoeda(valor);
        setBeneficios(
            beneficios.map(b => b.nome === nome ? { ...b, valor: formatado } : b)
        );
    };

    // Busca ícone
    const getIcon = (nome: string) => BENEFICIOS_PADRAO.find(b => b.nome === nome)?.icon;

    return (
        <Box mb={2}>
            <Autocomplete
                multiple
                options={BENEFICIOS_PADRAO.map(b => b.nome)}
                value={selectedNomes}
                onChange={handleChange}
                renderTags={(value, getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Chip
                            icon={getIcon(option)}
                            label={beneficioLabels[option] ?? option}
                            {...getTagProps({ index })}
                            key={option}
                            onDelete={() => setBeneficios(beneficios.filter(b => b.nome !== option))}
                            color={option === "Outro" ? "default" : "primary"}
                            sx={{ fontWeight: 'bold', fontSize: 14 }}
                        />
                    ))
                }
                renderInput={params => (
                    <TextField {...params} label={label} size="small" fullWidth />
                )}
            />

            <Box mt={2} display="flex" flexDirection="column" gap={2}>
                {/* Benefícios padrão */}
                {beneficios.filter(b => BENEFICIOS_PADRAO.map(x => x.nome).includes(b.nome) && b.nome !== "Outro").map(b => (
                    <Fade in key={b.nome}>
                        <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, bgcolor: "#f5f8fa" }}>
                            {getIcon(b.nome)}
                            <Typography variant="body1" sx={{ flex: 1, fontWeight: 500 }}>
                                {beneficioLabels[b.nome] ?? b.nome}
                            </Typography>
                            <TextField
                                label="Valor"
                                type="text"
                                size="small"
                                value={b.valor}
                                onChange={e => handleValorChange(b.nome, e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    inputMode: "decimal"
                                }}
                                placeholder="R$ 0,00"
                            />
                            <IconButton onClick={() => setBeneficios(beneficios.filter(x => x.nome !== b.nome))}>
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                    </Fade>
                ))}

                {/* Campo para adicionar benefício personalizado */}
                {selectedNomes.includes("Outro") && (
                    <Fade in>
                        <Paper elevation={2} sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            borderRadius: 2,
                            bgcolor: "#e6eefc",
                            flexWrap: 'wrap',
                            minHeight: 75,
                            justifyContent: 'flex-start'
                        }}>
                            <AddCircleOutlineIcon color="action" sx={{ fontSize: 28, mr: 1 }} />
                            <TextField
                                label="Nome do benefício"
                                placeholder="Exemplo: Gympass, Celular Corporativo"
                                value={outroNome}
                                onChange={e => setOutroNome(e.target.value)}
                                size="small"
                                sx={{
                                    maxWidth: 220,
                                    minWidth: 140,
                                    flex: 2
                                }}
                                InputProps={{
                                    style: { fontSize: 16, fontWeight: 500 }
                                }}
                            />
                            <TextField
                                label="Valor"
                                type="text"
                                size="small"
                                value={outroValor}
                                onChange={e => setOutroValor(formatarMoeda(e.target.value))}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    inputMode: "decimal",
                                    style: { fontSize: 16, fontWeight: 500 }
                                }}
                                sx={{
                                    maxWidth: 130,
                                    minWidth: 100,
                                    flex: 1
                                }}
                                placeholder="R$ 0,00"
                            />
                            <Button
                                variant="contained"
                                onClick={handleAddOutro}
                                sx={{
                                    minWidth: 120,
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    borderRadius: 2,
                                    boxShadow: 0,
                                    ml: 1
                                }}
                            >
                                Adicionar
                            </Button>
                        </Paper>
                    </Fade>
                )}

                {/* Cards para benefícios personalizados adicionados */}
                {beneficios.filter(
                    b => !BENEFICIOS_PADRAO.map(x => x.nome).includes(b.nome) && b.nome !== "Outro"
                ).map(b => (
                    <Fade in key={b.nome}>
                        <Paper elevation={1} sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            borderRadius: 2,
                            bgcolor: "#f0fff0"
                        }}>
                            <AddCircleOutlineIcon color="action" />
                            <Typography variant="body1" sx={{ flex: 1, fontWeight: 500 }}>{b.nome}:</Typography>
                            <TextField
                                label="Valor"
                                type="text"
                                size="small"
                                value={b.valor}
                                onChange={e => handleValorChange(b.nome, e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    inputMode: "decimal"
                                }}
                                sx={{
                                    maxWidth: 130,
                                    minWidth: 100
                                }}
                                placeholder="R$ 0,00"
                            />
                            <IconButton onClick={() => setBeneficios(beneficios.filter(x => x.nome !== b.nome))}>
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                    </Fade>
                ))}
            </Box>
        </Box>
    );
}
