import api from "./axios";
import type { LoginDTO } from "../types/LoginDTO";
import type { RegistroDTO } from "../types/RegistroDTO";
import type { Usuario } from "../types/Usuario";

/**
 * Tipo da resposta de autenticação.
 */
export interface AuthResponseDTO {
    token: string;
    usuario: Usuario;
}

/**
 * Função para login. Recebe os dados de login, retorna o token JWT e o usuário.
 */
export async function loginApi(data: LoginDTO): Promise<AuthResponseDTO> {
    const res = await api.post("/auth/login", data);
    return res.data as AuthResponseDTO;
}

/**
 * Função para registro. Recebe os dados de cadastro, retorna o token JWT e o usuário.
 */
export async function registerApi(data: RegistroDTO): Promise<AuthResponseDTO> {
    const res = await api.post("/auth/registro", data);
    return res.data as AuthResponseDTO;
}