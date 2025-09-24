import type {SimulacaoResponseDTO} from "../types/SimulacaoResponseDTO";
import { Paper, Typography, Box, Divider } from "@mui/material";

function formatReal(valor: number) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function SimulacaoResultado({ result }: { result: SimulacaoResponseDTO }) {
    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Resultado da Simulação
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box mb={2}>
                <Typography variant="body1">
                    Salário Líquido CLT: <strong>{formatReal(result.salarioLiquidoClt)}</strong>
                </Typography>
                <Typography variant="body1">
                    Salário Líquido PJ: <strong>{formatReal(result.salarioLiquidoPj)}</strong>
                </Typography>
                <Typography variant="body1">
                    Provisão de Benefícios CLT: <strong>{formatReal(result.provisaoBeneficios)}</strong>
                </Typography>
                <Typography variant="body1">
                    Reserva de Emergência Sugerida PJ: <strong>{formatReal(result.valorReservaSugerido)}</strong>
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
                Comparativo Detalhado:
            </Typography>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 14 }}>
        {JSON.stringify(result.comparativoDetalhado, null, 2)}
      </pre>
        </Paper>
    );
}