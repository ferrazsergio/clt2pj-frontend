import api from "./axios";
import type {SimulacaoRequestDTO} from "../types/SimulacaoRequestDTO";
import type {SimulacaoResponseDTO} from "../types/SimulacaoResponseDTO";

export async function simularApi(dto: SimulacaoRequestDTO): Promise<SimulacaoResponseDTO> {
    const res = await api.post("/simulacao", dto);
    return res.data;
}

export async function salvarSimulacaoApi(simulacaoData: any, token: string): Promise<any> {
    console.log("📝 Salvando simulação:", simulacaoData);
    const res = await api.post("/simulacao/salvar", simulacaoData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}
export async function buscarHistoricoApi(usuarioId: string, token: string): Promise<SimulacaoResponseDTO[]> {
    // Validação robusta do usuarioId
    if (!usuarioId || usuarioId.trim() === '' || usuarioId === 'undefined') {
        return [];
    }
    try {
        const res = await api.get(`/simulacao/historico/${encodeURIComponent(usuarioId)}`);
        return res.data;
    } catch (error: any) {
        
        if (error.response) {
        }
        
        return [];
    }
}

