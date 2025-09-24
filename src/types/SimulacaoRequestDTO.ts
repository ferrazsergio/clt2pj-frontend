import type {BeneficioDTO} from "./BeneficioDTO";

export interface SimulacaoRequestDTO {
    salarioClt: number;
    beneficiosClt: BeneficioDTO[];
    salarioPj: number;
    tipoTributacao: string;
    beneficiosPj: BeneficioDTO[];
    reservaEmergencia?: number;
    beneficiosSelecionados: string[];
}