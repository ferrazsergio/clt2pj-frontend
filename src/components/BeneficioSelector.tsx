import { useState } from "react";
import {
    Autocomplete,
    TextField,
    Box,
    Chip,
    Typography,
    Button,
    Paper,
    IconButton,
    Fade,
    InputAdornment,
    Tooltip,
    Divider,
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
                sx={{
                    "& .MuiInputBase-root, & .MuiOutlinedInput-root": {
                        background: "#fff !important",
                        borderRadius: "12px",
                        fontFamily: "'SF Pro Display','Inter','Roboto','Arial',sans-serif",
                        borderColor: "#e3e8ee",
                        boxShadow: "none"
                    },
                    "& .MuiAutocomplete-tag": {
                        background: "#f5f5f7"
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e3e8ee"
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#b0b8c9"
                    },
                    // Fix fundo preto no hover/autofill
                    "& .Mui-focused, & .MuiInputBase-input": {
                        background: "#fff !important",
                        color: "#1d1d1f !important"
                    },
                    "& .MuiAutocomplete-inputRoot": {
                        background: "#fff !important",
                        color: "#1d1d1f !important"
                    },
                    "& input": {
                        background: "#fff !important",
                        color: "#1d1d1f !important",
                        WebkitBoxShadow: "0 0 0 100px #fff inset !important"
                    }
                }}
                PaperComponent={(props) => (
                    <Paper
                        {...props}
                        sx={{
                            background: "#fff",
                            borderRadius: "16px",
                            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                        }}
                    />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Tooltip key={option} title={beneficioLabels[option] ?? option} arrow>
                            <Chip
                                icon={getIcon(option)}
                                label={beneficioLabels[option] ?? option}
                                {...getTagProps({ index })}
                                onDelete={() => setBeneficios(beneficios.filter(b => b.nome !== option))}
                                color={option === "Outro" ? "default" : "primary"}
                                sx={{ fontWeight: 'bold', fontSize: 14, borderRadius: 8 }}
                            />
                        </Tooltip>
                    ))
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        label={label}
                        size="small"
                        fullWidth
                        sx={{
                            background: "#fff !important",
                            borderRadius: "12px",
                            fontFamily: "'SF Pro Display','Inter','Roboto','Arial',sans-serif",
                            "& input": {
                                background: "#fff !important",
                                WebkitBoxShadow: "0 0 0 100px #fff inset !important",
                                WebkitTextFillColor: "#1d1d1f !important",
                                color: "#1d1d1f !important"
                            },
                        }}
                    />
                )}
            />

            <Box mt={2} display="flex" flexDirection="column" gap={2}>
                {/* ...restante do componente igual... */}
            </Box>
        </Box>
    );
}