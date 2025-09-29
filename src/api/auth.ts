import api from "./axios"; // importa seu axios já configurado
import type { LoginDTO } from "../types/LoginDTO";
import type { RegistroDTO } from "../types/RegistroDTO";

/**
 * Função para login. Recebe os dados de login, retorna o token JWT (string).
 */
export async function loginApi(data: LoginDTO): Promise<string> {
    const res = await api.post("/auth/login", data);
    return res.data as string;
}

/**
 * Função para registro. Recebe os dados de cadastro, retorna o token JWT (string).
 */
export async function registerApi(data: RegistroDTO): Promise<string> {
    const res = await api.post("/auth/registro", data);
    return res.data as string;
}