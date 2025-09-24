import type {SimulacaoResponseDTO} from "../types/SimulacaoResponseDTO";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Registrar Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
    result: SimulacaoResponseDTO;
};

export default function SimulacaoGrafico({ result }: Props) {
    const data = {
        labels: ["Salário Líquido", "Benefícios", "Reserva Emergência"],
        datasets: [
            {
                label: "CLT",
                data: [
                    result.salarioLiquidoClt,
                    result.provisaoBeneficios,
                    0,
                ],
                backgroundColor: "rgba(33, 150, 243, 0.7)",
            },
            {
                label: "PJ",
                data: [
                    result.salarioLiquidoPj,
                    0,
                    result.valorReservaSugerido,
                ],
                backgroundColor: "rgba(76, 175, 80, 0.7)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
            title: { display: true, text: "Comparativo CLT vs PJ" },
        },
    };

    return (
        <Box mt={4}>
        <Typography variant="h6" sx={{ mb: 2 }}>Gráfico Comparativo</Typography>
    <Bar data={data} options={options} />
    </Box>
);
}