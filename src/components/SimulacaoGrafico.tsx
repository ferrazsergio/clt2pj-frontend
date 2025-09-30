import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import { Box, Typography, Paper, Fade, Zoom } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
} from "chart.js";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// Registrar Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

type Props = {
    result: SimulacaoResponseDTO;
};

export default function SimulacaoGrafico({ result }: Props) {
    // Proteção contra dados indefinidos
    const salarioClt = Number(result.salarioLiquidoClt ?? 0);
    const salarioPj = Number(result.salarioLiquidoPj ?? 0);
    const beneficiosClt = Number(result.provisaoBeneficios ?? 0);
    const reservaPj = Number(result.valorReservaSugerido ?? 0);

    const data = {
        labels: ["Salário Líquido", "Benefícios", "Reserva Emergência"],
        datasets: [
            {
                label: "CLT",
                data: [salarioClt, beneficiosClt, 0],
                backgroundColor: "#667eea", // Apple-inspired blue
                borderRadius: 12,
                borderSkipped: false,
                borderWidth: 0,
                barPercentage: 0.7,
                categoryPercentage: 0.8,
            },
            {
                label: "PJ",
                data: [salarioPj, 0, reservaPj],
                backgroundColor: "#4CAF50", // Apple-inspired green
                borderRadius: 12,
                borderSkipped: false,
                borderWidth: 0,
                barPercentage: 0.7,
                categoryPercentage: 0.8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    font: { 
                        size: 14, 
                        family: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
                        weight: "600" as const
                    },
                    color: "#1d1d1f",
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 20,
                },
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return `${context.dataset.label}: R$ ${Number(context.parsed.y).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
                    }
                },
                backgroundColor: "#ffffff",
                titleColor: "#1d1d1f",
                bodyColor: "#1d1d1f",
                borderColor: "#e5e5e7",
                borderWidth: 1,
                titleFont: { 
                    family: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
                    size: 13,
                    weight: "600" as const
                },
                bodyFont: { 
                    family: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
                    size: 13 
                },
                padding: 12,
                cornerRadius: 8,
                boxPadding: 6,
                usePointStyle: true,
            }
        },
        scales: {
            y: { 
                beginAtZero: true,
                grid: { 
                    color: "#f5f5f7",
                    drawBorder: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    callback: (value: number) => `R$ ${value.toLocaleString("pt-BR")}`,
                    font: { 
                        size: 12, 
                        family: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif" 
                    },
                    color: "#86868b",
                    padding: 8,
                },
            },
            x: {
                grid: { 
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: { 
                    font: { 
                        size: 13, 
                        family: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', sans-serif",
                        weight: "600" as const
                    }, 
                    color: "#1d1d1f" 
                }
            }
        },
        animation: {
            duration: 1000,
            easing: "easeOutQuart" as any
        },
        interaction: {
            intersect: false,
            mode: 'index' as const,
        },
    };

    return (
        <Zoom in timeout={600}>
            <Box mt={4}>
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
                            Comparativo Visual
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: "#86868b",
                                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                            }}
                        >
                            Análise gráfica dos regimes CLT e PJ
                        </Typography>
                    </Box>

                    <Fade in timeout={800}>
                        <Box sx={{ height: 400, position: "relative" }}>
                            <Bar data={data} options={options as any} />
                        </Box>
                    </Fade>

                    {/* Legenda explicativa */}
                    <Fade in timeout={1000}>
                        <Box 
                            sx={{ 
                                mt: 3, 
                                p: 2, 
                                borderRadius: 3, 
                                backgroundColor: "#fafafa",
                                border: "1px solid #e5e5e7",
                            }}
                        >
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: "#86868b",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                    fontWeight: 600,
                                    display: "block",
                                    textAlign: "center",
                                }}
                            >
                                💡 O gráfico mostra a distribuição de valores entre os regimes
                            </Typography>
                        </Box>
                    </Fade>
                </Paper>
            </Box>
        </Zoom>
    );
}