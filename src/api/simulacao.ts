import api from "./axios";
import type {SimulacaoRequestDTO} from "../types/SimulacaoRequestDTO";
import type {SimulacaoResponseDTO} from "../types/SimulacaoResponseDTO";

export async function simularApi(dto: SimulacaoRequestDTO): Promise<SimulacaoResponseDTO> {
    const res = await api.post("/simulacao", dto);
    return res.data;
}
export async function buscarHistoricoApi(): Promise<SimulacaoResponseDTO[]> {
    const res = await api.get("/simulacao/historico");
    return res.data;
}