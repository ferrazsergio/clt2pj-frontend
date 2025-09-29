import { createContext } from "react";
import type { LoginDTO } from "../types/LoginDTO";
import type { RegistroDTO } from "../types/RegistroDTO";
import type { Usuario } from "../types/Usuario";

export interface AuthContextType {
    user: Usuario | null;
    token: string | null;
    login: (data: LoginDTO) => Promise<void>;
    register: (data: RegistroDTO) => Promise<void>;
    logout: () => void;
    loginOAuth2: (data: { token: string; usuario: string; provider: string }) => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);