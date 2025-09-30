import { createContext, useContext } from "react";
import type { LoginDTO } from "../types/LoginDTO";
import type { RegistroDTO } from "../types/RegistroDTO";
// import type { Usuario } from "../types/Usuario"; // Caso queira user mais completo

/**
 * Interface para o contexto de autenticação.
 * Melhore a tipagem de `user` para refletir seu modelo real se precisar.
 */
interface AuthContextType {
    user: string | null; // Ou Usuario | null
    token: string | null;
    login: (data: LoginDTO) => Promise<void>;
    register: (data: RegistroDTO) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

// Valor padrão robusto - lança erro se usado fora do provider
function throwContextError(method: string) {
    throw new Error(`useAuth: O método "${method}" foi chamado fora do AuthProvider.`);
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => Promise.reject(throwContextError("login")),
    register: () => Promise.reject(throwContextError("register")),
    logout: () => throwContextError("logout"),
    isAuthenticated: false,
});

/**
 * Hook customizado: garantido, lança erro se usado fora do provider.
 */
export const useAuth = () => useContext(AuthContext);