import type { SimulacaoResponseDTO } from "../types/SimulacaoResponseDTO";
import { Button, Box, Tooltip, Snackbar, Alert } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import { useState } from "react";

function formatReal(valor: number | undefined | null) {
    const num = Number(valor);
    if (isNaN(num) || valor === undefined || valor === null) return "R$ 0,00";
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function SimulacaoExportar({ result }: { result: SimulacaoResponseDTO }) {
    const [snack, setSnack] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

    const exportPDF = () => {
        try {
            const doc = new jsPDF();
            doc.text("Resultado da Simulação CLT vs PJ", 14, 16);
            autoTable(doc, {
                startY: 24,
                head: [["Campo", "Valor"]],
                body: [
                    ["Salário Líquido CLT", formatReal(result.salarioLiquidoClt)],
                    ["Salário Líquido PJ", formatReal(result.salarioLiquidoPj)],
                    ["Provisão Benefícios CLT", formatReal(result.provisaoBeneficios)],
                    ["Reserva Emergência PJ", formatReal(result.valorReservaSugerido)],
                ],
            });
            doc.save("simulacao-clt-vs-pj.pdf");
            setSnack({ open: true, message: "PDF exportado com sucesso!", severity: "success" });
        } catch (e) {
            setSnack({ open: true, message: "Erro ao exportar PDF.", severity: "error" });
        }
    };

    const exportExcel = () => {
        try {
            const data = [
                ["Campo", "Valor"],
                ["Salário Líquido CLT", formatReal(result.salarioLiquidoClt)],
                ["Salário Líquido PJ", formatReal(result.salarioLiquidoPj)],
                ["Provisão Benefícios CLT", formatReal(result.provisaoBeneficios)],
                ["Reserva Emergência PJ", formatReal(result.valorReservaSugerido)],
            ];
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Simulação");
            XLSX.writeFile(workbook, "simulacao-clt-vs-pj.xlsx");
            setSnack({ open: true, message: "Excel exportado com sucesso!", severity: "success" });
        } catch (e) {
            setSnack({ open: true, message: "Erro ao exportar Excel.", severity: "error" });
        }
    };

    return (
        <Box display="flex" gap={2} mt={2} flexWrap="wrap" justifyContent="center">
            <Tooltip title="Exporta os dados da simulação em PDF" arrow>
                <span>
                    <Button
                        variant="outlined"
                        startIcon={<PictureAsPdfIcon />}
                        onClick={exportPDF}
                        aria-label="Exportar PDF"
                        sx={{
                            fontWeight: 600,
                            borderRadius: 8,
                            fontSize: "1em",
                            minWidth: 0,
                            background: "#fff",
                            color: "primary.main",
                            border: "1.5px solid #e3e8ee",
                            boxShadow: "none",
                            px: 2.5,
                            py: 1,
                            transition: "box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                            "&:hover": {
                                background: "#f5f5f7",
                                borderColor: "#b0b8c9",
                                color: "primary.main",
                                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                                transform: "scale(1.03)",
                            },
                            "&:active": {
                                background: "#e8e8ed",
                                color: "primary.main",
                                borderColor: "#b0b8c9",
                            }
                        }}
                    >
                        Exportar PDF
                    </Button>
                </span>
            </Tooltip>
            <Tooltip title="Exporta os dados da simulação em Excel" arrow>
                <span>
                    <Button
                        variant="outlined"
                        startIcon={<TableViewIcon />}
                        onClick={exportExcel}
                        aria-label="Exportar Excel"
                        sx={{
                            fontWeight: 600,
                            borderRadius: 8,
                            fontSize: "1em",
                            minWidth: 0,
                            background: "#fff",
                            color: "primary.main",
                            border: "1.5px solid #e3e8ee",
                            boxShadow: "none",
                            px: 2.5,
                            py: 1,
                            transition: "box-shadow 0.14s, border 0.14s, color 0.14s, transform 0.11s",
                            "&:hover": {
                                background: "#f5f5f7",
                                borderColor: "#b0b8c9",
                                color: "primary.main",
                                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                                transform: "scale(1.03)",
                            },
                            "&:active": {
                                background: "#e8e8ed",
                                color: "primary.main",
                                borderColor: "#b0b8c9",
                            }
                        }}
                    >
                        Exportar Excel
                    </Button>
                </span>
            </Tooltip>
            <Snackbar
                open={snack.open}
                autoHideDuration={2600}
                onClose={() => setSnack(s => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnack(s => ({ ...s, open: false }))}
                    severity={snack.severity}
                    sx={{ width: "100%" }}
                >
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}