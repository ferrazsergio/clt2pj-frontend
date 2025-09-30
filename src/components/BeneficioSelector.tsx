import { useState } from "react";
import {
    Autocomplete,
    TextField,
    Box,
    Chip,
    Typography,
    Paper,
    IconButton,
    Fade,
    InputAdornment,
    Tooltip,
    Stack,
    styled,
    alpha,
    Button,
    Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommuteIcon from "@mui/icons-material/Commute";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import type { BeneficioDTO } from "../types/BeneficioDTO";

const AppleTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 12,
        backgroundColor: "#fff",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            backgroundColor: "#fafafa",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha(theme.palette.primary.main, 0.3),
            },
        },
        "&.Mui-focused": {
            backgroundColor: "#fff",
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
            },
        },
        "& input": {
            background: "#fff !important",
            WebkitBoxShadow: "0 0 0 100px #fff inset !important",
            boxShadow: "0 0 0 100px #fff inset !important",
            WebkitTextFillColor: "#1d1d1f !important",
            color: "#1d1d1f",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
            fontSize: "1rem",
            fontWeight: 400,
            height: "44px",
            display: "flex",
            alignItems: "center",
        },
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#d2d2d7",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "& .MuiInputLabel-root": {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
        fontWeight: 500,
    },
}));

const AppleChip = styled(Chip)(({ theme }) => ({
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: "#f5f5f7",
    color: "#667eea",
    border: "1px solid #e5e5e7",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
    ".MuiChip-icon": {
        marginLeft: 2,
        marginRight: 8,
    },
}));

const AppleIconButton = styled(IconButton)(({ theme }) => ({
    color: "#86868b",
    borderRadius: 7,
    transition: "background 0.14s, color 0.12s",
    "&:hover": {
        backgroundColor: "rgba(244, 67, 54, 0.07)",
        color: "#f44336",
    },
}));

const beneficioLabels: Record<string, string> = {
    VT: "Vale Transporte",
    VR: "Vale Refeição",
    VA: "Vale Alimentação",
    "Plano de Saúde": "Plano de Saúde",
    "Plano Odontológico": "Plano Odontológico",
    Outro: "Outro"
};

const BENEFICIOS_PADRAO = [
    { nome: "VT", icon: <CommuteIcon sx={{ color: "#667eea" }} /> },
    { nome: "VR", icon: <RestaurantIcon sx={{ color: "#4CAF50" }} /> },
    { nome: "VA", icon: <RestaurantIcon sx={{ color: "#FF9800" }} /> },
    { nome: "Plano de Saúde", icon: <LocalHospitalIcon sx={{ color: "#F44336" }} /> },
    { nome: "Plano Odontológico", icon: <LocalHospitalIcon sx={{ color: "#9C27B0" }} /> },
    { nome: "Outro", icon: <AddCircleOutlineIcon sx={{ color: "#86868b" }} /> },
];

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

    const handleChange = (_: unknown, values: string[]) => {
        const novosBeneficios: BeneficioDTO[] = [];
        values
            .filter(nome => nome !== "Outro")
            .forEach(nome => {
                const existente = beneficios.find(b => b.nome === nome);
                novosBeneficios.push(existente ? existente : { nome, valor: "" });
            });
        const beneficiosPersonalizados = beneficios.filter(
            b => !BENEFICIOS_PADRAO.map(x => x.nome).includes(b.nome)
        );
        if (values.includes("Outro")) {
            novosBeneficios.push({ nome: "Outro", valor: "" });
        }
        setBeneficios([...novosBeneficios, ...beneficiosPersonalizados]);
    };

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

    const handleValorChange = (nome: string, valor: string) => {
        const formatado = formatarMoeda(valor);
        setBeneficios(
            beneficios.map(b => b.nome === nome ? { ...b, valor: formatado } : b)
        );
    };

    const handleRemoveBeneficio = (nome: string) => {
        setBeneficios(beneficios.filter(b => b.nome !== nome));
    };

    const getIcon = (nome: string) => BENEFICIOS_PADRAO.find(b => b.nome === nome)?.icon;

    const beneficiosComValor = beneficios.filter(b => b.nome !== "Outro" && BENEFICIOS_PADRAO.map(x => x.nome).includes(b.nome));
    const beneficiosPersonalizados = beneficios.filter(b => !BENEFICIOS_PADRAO.map(x => x.nome).includes(b.nome));

    return (
        <Box>
            {/* Autocomplete para seleção de benefícios */}
            <Autocomplete
                multiple
                options={BENEFICIOS_PADRAO.map(b => b.nome)}
                value={selectedNomes}
                onChange={handleChange}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 12,
                        backgroundColor: "#fff",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            backgroundColor: "#fafafa",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: alpha("#667eea", 0.3),
                            },
                        },
                        "&.Mui-focused": {
                            backgroundColor: "#fff",
                            boxShadow: `0 0 0 4px ${alpha("#667eea", 0.1)}`,
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#667eea",
                                borderWidth: 2,
                            },
                        },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d2d2d7",
                    },
                    "& .MuiAutocomplete-tag": {
                        borderRadius: 8,
                        backgroundColor: "#f5f5f7",
                        border: "1px solid #e5e5e7",
                        fontWeight: 600,
                    },
                }}
                PaperComponent={(props) => (
                    <Paper
                        {...props}
                        sx={{
                            borderRadius: 0,
                            border: "1px solid #e5e5e7",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
                            mt: 1,
                            maxHeight: 280,
                            overflowY: "auto",
                            "& .MuiAutocomplete-option": {
                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                fontSize: "1.06rem",
                                padding: "11px 18px",
                                borderRadius: 0,
                                "&:hover": {
                                    backgroundColor: "#f5f5f7",
                                },
                                minHeight: 40,
                            },
                        }}
                    />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Tooltip key={option} title={beneficioLabels[option] ?? option} arrow placement="top">
                            <AppleChip
                                icon={getIcon(option)}
                                label={beneficioLabels[option] ?? option}
                                {...getTagProps({ index })}
                                sx={{
                                    backgroundColor: option === "Outro" ? "#f5f5f7" : "#f0f4ff",
                                    color: option === "Outro" ? "#86868b" : "#667eea",
                                }}
                            />
                        </Tooltip>
                    ))
                }
                renderInput={params => (
                    <AppleTextField
                        {...params}
                        label={label}
                        size="small"
                        fullWidth
                    />
                )}
            />

            {/* Benefícios com valores */}
            {(beneficiosComValor.length > 0 || beneficiosPersonalizados.length > 0) && (
                <Fade in timeout={300}>
                    <Paper 
                        elevation={0}
                        sx={{
                            p: 3,
                            mt: 2,
                            borderRadius: 0,
                            border: "1px solid #e5e5e7",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                fontWeight: 600,
                                color: "#1d1d1f",
                                mb: 3,
                            }}
                        >
                            Valores dos Benefícios
                        </Typography>

                        <Stack spacing={2}>
                            {beneficiosComValor.map((beneficio) => (
                                <Box 
                                    key={beneficio.nome}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0,
                                        p: 2,
                                        borderRadius: 0,
                                        backgroundColor: "#fff",
                                        border: "1px solid #e5e5e7",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            borderColor: "#d2d2d7",
                                        },
                                        width: "100%",
                                        minHeight: "56px",
                                    }}
                                >
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0,
                                        flex: 1,
                                        minWidth: 0,
                                    }}>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.5,
                                            width: "170px",
                                            flexShrink: 0,
                                        }}>
                                            {getIcon(beneficio.nome)}
                                            <Typography 
                                                variant="body2"
                                                sx={{ 
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                    fontWeight: 600,
                                                    color: "#1d1d1f",
                                                    whiteSpace: "nowrap",
                                                    overflow: "visible",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >
                                                {beneficioLabels[beneficio.nome]}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            flex: 1,
                                            minWidth: 0,
                                            display: "flex",
                                            alignItems: "center",
                                        }}>
                                            <AppleTextField
                                                size="small"
                                                value={beneficio.valor}
                                                onChange={(e) => handleValorChange(beneficio.nome, e.target.value)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                                    inputMode: "numeric"
                                                }}
                                                placeholder="0,00"
                                                fullWidth
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: 10,
                                                        height: "44px",
                                                        display: "flex",
                                                        alignItems: "center"
                                                    },
                                                    "& input": {
                                                        height: "44px",
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <AppleIconButton
                                        onClick={() => handleRemoveBeneficio(beneficio.nome)}
                                        size="small"
                                        sx={{ height: "44px", display: "flex", alignItems: "center" }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </AppleIconButton>
                                </Box>
                            ))}

                            {beneficiosPersonalizados.map((beneficio) => (
                                <Box 
                                    key={beneficio.nome}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0,
                                        p: 2,
                                        borderRadius: 0,
                                        backgroundColor: "#fff",
                                        border: "1px solid #e5e5e7",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            borderColor: "#d2d2d7",
                                        },
                                        width: "100%",
                                        minHeight: "56px",
                                    }}
                                >
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0,
                                        flex: 1,
                                        minWidth: 0,
                                    }}>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.5,
                                            width: "170px",
                                            flexShrink: 0,
                                        }}>
                                            <AddCircleOutlineIcon sx={{ color: "#86868b" }} />
                                            <Typography 
                                                variant="body2"
                                                sx={{ 
                                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                                    fontWeight: 600,
                                                    color: "#1d1d1f",
                                                    whiteSpace: "nowrap",
                                                    overflow: "visible",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >
                                                {beneficio.nome}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            flex: 1,
                                            minWidth: 0,
                                            display: "flex",
                                            alignItems: "center",
                                        }}>
                                            <AppleTextField
                                                size="small"
                                                value={beneficio.valor}
                                                onChange={(e) => handleValorChange(beneficio.nome, e.target.value)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                                    inputMode: "numeric"
                                                }}
                                                placeholder="0,00"
                                                fullWidth
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: 10,
                                                        height: "44px",
                                                        display: "flex",
                                                        alignItems: "center"
                                                    },
                                                    "& input": {
                                                        height: "44px",
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <AppleIconButton
                                        onClick={() => handleRemoveBeneficio(beneficio.nome)}
                                        size="small"
                                        sx={{ height: "44px", display: "flex", alignItems: "center" }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </AppleIconButton>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Fade>
            )}

            {/* Adicionar benefício personalizado */}
            {selectedNomes.includes("Outro") && (
                <Fade in timeout={500}>
                    <Paper 
                        elevation={0}
                        sx={{
                            p: 3,
                            mt: 2,
                            borderRadius: 0,
                            border: "1px solid #e5e5e7",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                fontWeight: 600,
                                color: "#1d1d1f",
                                mb: 2,
                            }}
                        >
                            Adicionar Benefício Personalizado
                        </Typography>

                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid size={{ xs: 12, sm: 5 }}>
                                <AppleTextField
                                    label="Nome do benefício"
                                    value={outroNome}
                                    onChange={(e) => setOutroNome(e.target.value)}
                                    fullWidth
                                    placeholder="Ex: Gympass, Seguro de vida..."
                                />
                            </Grid>
                            
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <AppleTextField
                                    label="Valor"
                                    value={outroValor}
                                    onChange={(e) => setOutroValor(formatarMoeda(e.target.value))}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                        inputMode: "numeric"
                                    }}
                                    placeholder="0,00"
                                    fullWidth
                                />
                            </Grid>
                            
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddCircleOutlineIcon />}
                                    onClick={handleAddOutro}
                                    disabled={!outroNome.trim() || !outroValor}
                                    fullWidth
                                    sx={{
                                        borderRadius: 12,
                                        borderColor: "#d2d2d7",
                                        color: "#1d1d1f",
                                        fontWeight: 600,
                                        fontSize: "0.9rem",
                                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
                                        textTransform: "none",
                                        py: 1.2,
                                        "&:hover": {
                                            borderColor: "#86868b",
                                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        },
                                        "&.Mui-disabled": {
                                            borderColor: "#e5e5e7",
                                            color: "#86868b",
                                        },
                                    }}
                                >
                                    Adicionar
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Fade>
            )}
        </Box>
    );
}