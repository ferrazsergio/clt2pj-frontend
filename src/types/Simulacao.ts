import type {Usuario} from "./Usuario";

export interface Simulacao {
    id: string;
    usuario: Usuario;
    salarioClt: number;
    salarioPj: number;
    beneficios?: string;
    resultadoComparativo?: string;
    dataCriacao: string; // ISO date string (LocalDateTime)
}