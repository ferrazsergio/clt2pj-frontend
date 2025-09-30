// Detalhamento dos benefícios para CLT e PJ
export interface BeneficiosDetalhado {
  clt?: {
    salarioLiquido?: number;
    inss?: number;
    irrf?: number;
    totalBeneficios?: number;
    beneficiosSelecionados?: string[];
  };
  pj?: {
    salarioLiquido?: number;
    tipoTributacao?: string;
    reservaEmergencia?: number;
    totalBeneficios?: number;
    beneficiosSelecionados?: string[];
  };
  valorReservaSugerido?: number;
}

// DTO principal da simulação
export interface SimulacaoResponseDTO {
  salarioLiquidoClt: number;
  salarioLiquidoPj: number;
  provisaoBeneficios: number;
  valorReservaSugerido: number;

  // Agora tipado corretamente 👇
  comparativoDetalhado: Record<string, BeneficiosDetalhado>;

  // Versões formatadas em BRL (opcionais)
  salarioLiquidoCltBR?: string;
  salarioLiquidoPjBR?: string;
  provisaoBeneficiosBR?: string;
  valorReservaSugeridoBR?: string;
}
