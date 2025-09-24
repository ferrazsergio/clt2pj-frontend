import { createContext, useContext } from "react";
import type { LoginDTO } from "../types/LoginDTO";
import type { RegistroDTO } from "../types/RegistroDTO";

interface AuthContextType {
    user: string | null;
    token: string | null;
    login: (data: LoginDTO) => Promise<void>;
    register: (data: RegistroDTO) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);