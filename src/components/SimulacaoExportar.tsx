import type {SimulacaoResponseDTO} from "../types/SimulacaoResponseDTO";
import { Button, Box } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function SimulacaoExportar({ result }: { result: SimulacaoResponseDTO }) {
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Resultado da Simulação CLT vs PJ", 14, 16);
        autoTable(doc, {
            startY: 24,
            head: [["Campo", "Valor"]],
            body: [
                ["Salário Líquido CLT", result.salarioLiquidoClt.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })],
                ["Salário Líquido PJ", result.salarioLiquidoPj.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })],
                ["Provisão Benefícios CLT", result.provisaoBeneficios.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })],
                ["Reserva Emergência PJ", result.valorReservaSugerido.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })],
            ],
        });
        doc.save("simulacao-clt-vs-pj.pdf");
    };

    const exportExcel = () => {
        const data = [
            ["Campo", "Valor"],
            ["Salário Líquido CLT", result.salarioLiquidoClt],
            ["Salário Líquido PJ", result.salarioLiquidoPj],
            ["Provisão Benefícios CLT", result.provisaoBeneficios],
            ["Reserva Emergência PJ", result.valorReservaSugerido],
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Simulação");
        XLSX.writeFile(workbook, "simulacao-clt-vs-pj.xlsx");
    };

    return (
        <Box display="flex" gap={2} mt={2}>
            <Button variant="outlined" onClick={exportPDF}>Exportar PDF</Button>
            <Button variant="outlined" onClick={exportExcel}>Exportar Excel</Button>
        </Box>
    );
}