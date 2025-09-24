import axios from "axios";
import type {LoginDTO} from "../types/LoginDTO";
import type {RegistroDTO} from "../types/RegistroDTO";

/**
 * Função para login. Recebe os dados de login, retorna apenas o token JWT (string).
 */
export async function loginApi(data: LoginDTO): Promise<string> {
    const res = await axios.post("/auth/login", data);
    // O backend retorna o token como string simples, não objeto.
    return res.data as string;
}

/**
 * Função para registro. Recebe os dados de cadastro, retorna apenas o token JWT (string).
 */
export async function registerApi(data: RegistroDTO): Promise<string> {
    const res = await axios.post("/auth/registro", data);
    // O backend retorna o token como string simples, não objeto.
    return res.data as string;
}