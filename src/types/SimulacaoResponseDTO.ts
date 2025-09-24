export interface SimulacaoResponseDTO {
    salarioLiquidoClt: number;
    salarioLiquidoPj: number;
    provisaoBeneficios: number;
    valorReservaSugerido: number;
    comparativoDetalhado: Record<string, any>;
}