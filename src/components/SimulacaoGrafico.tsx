import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import { Box, Typography, Paper } from "@mui/material";
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
                backgroundColor: "#0071e3", // Apple blue
                borderRadius: 8,
                borderSkipped: false,
            },
            {
                label: "PJ",
                data: [salarioPj, 0, reservaPj],
                backgroundColor: "#43a047", // Apple green
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    font: { size: 15, family: "'SF Pro Display','Inter','Roboto','Arial',sans-serif" },
                    color: "#1d1d1f"
                },
            },
            title: {
                display: true,
                text: "Comparativo CLT vs PJ",
                font: { size: 19, weight: "bold", family: "'SF Pro Display','Inter','Roboto','Arial',sans-serif" },
                color: "#0071e3",
                padding: { top: 12, bottom: 16 }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return `${context.dataset.label}: R$ ${Number(context.parsed.y).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
                    }
                },
                backgroundColor: "#fff",
                titleColor: "#1d1d1f",
                bodyColor: "#1d1d1f",
                borderColor: "#e3e8ee",
                borderWidth: 1.2,
                titleFont: { family: "'SF Pro Display','Inter','Roboto','Arial',sans-serif" },
                bodyFont: { family: "'SF Pro Display','Inter','Roboto','Arial',sans-serif" },
                padding: 10,
            }
        },
        scales: {
            y: { 
                beginAtZero: true,
                ticks: {
                    callback: (value: number) => `R$ ${value.toLocaleString("pt-BR")}`,
                    font: { size: 14, family: "'SF Pro Display','Inter','Roboto','Arial',sans-serif" },
                    color: "#6e6e73"
                },
                grid: { color: "#e3e8ee" }
            },
            x: {
                grid: { color: "#f5f5f7" },
                ticks: { font: { size: 14, family: "'SF Pro Display','Inter','Roboto','Arial',sans-serif" }, color: "#6e6e73" }
            }
        },
        animation: {
            duration: 900,
            easing: "easeOutQuart" as any
        }
    };

    return (
        <Box mt={4}>
            <Paper elevation={1} sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 5,
                mb: 2,
                boxShadow: "0 1.5px 16px rgba(0,0,0,0.07)",
                border: "1.2px solid #e3e8ee",
                background: "#fff",
                transition: "box-shadow 0.14s, border 0.13s",
                '&:hover': { boxShadow: "0 3px 28px rgba(0,0,0,0.11)" }
            }}>
                <Typography variant="h6" sx={{
                    mb: 2, fontWeight: 700, color: "#0071e3", fontFamily: "'SF Pro Display','Inter','Roboto','Arial',sans-serif"
                }}>
                    Gráfico Comparativo
                </Typography>
                <Bar data={data} options={options as any} />
            </Paper>
        </Box>
    );
}