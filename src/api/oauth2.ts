import axios from "axios";

/**
 * Recebe o token JWT após autenticação social via Google/GitHub.
 * Não recebe payload; a autenticação é feita pelo provedor, e o backend retorna o token.
 */
export async function oauth2Sucesso(): Promise<string> {
    const res = await axios.get("/auth/oauth2/sucesso");
    return res.data as string; // Token JWT
}