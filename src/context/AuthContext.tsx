import { createContext } from "react";
import type { LoginDTO } from "../types/LoginDTO";
import type { RegistroDTO } from "../types/RegistroDTO";
import type { Usuario } from "../types/Usuario";

/**
 * Interface para o contexto de autenticação.
 * Permite login, registro, logout, login via OAuth2 e verificação de autenticado.
 */
export interface AuthContextType {
    user: Usuario | null;
    token: string | null;
    login: (data: LoginDTO) => Promise<void>;
    register: (data: RegistroDTO) => Promise<void>;
    logout: () => void;
    loginOAuth2: (data: { token: string; usuario: string; provider: string }) => void;
    isAuthenticated: boolean;
    // Métodos adicionais futuros:
    // refreshToken?: () => Promise<void>;
    // updateProfile?: (data: Partial<Usuario>) => Promise<void>;
}

// Valor padrão: lança erro ao usar fora do provider, previne bugs silenciosos.
function throwContextError(method: string) {
    throw new Error(`AuthContext: O método "${method}" foi chamado fora do AuthProvider.`);
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => Promise.reject(throwContextError("login")),
    register: () => Promise.reject(throwContextError("register")),
    logout: () => throwContextError("logout"),
    loginOAuth2: () => throwContextError("loginOAuth2"),
    isAuthenticated: false,
});