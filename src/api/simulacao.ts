import api from "./axios";
import type {SimulacaoRequestDTO} from "../types/SimulacaoRequestDTO";
import type {SimulacaoResponseDTO} from "../types/SimulacaoResponseDTO";

export async function simularApi(dto: SimulacaoRequestDTO): Promise<SimulacaoResponseDTO> {
    const res = await api.post("/simulacao", dto);
    return res.data;
}
// Envia o usuário por query param e token no header
export async function buscarHistoricoApi(usuario: string, token: string): Promise<SimulacaoResponseDTO[]> {
    const res = await api.get(`/simulacao/historico?usuario=${encodeURIComponent(usuario)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

