import React, { createContext, useContext, useState, useEffect } from "react";
import type {LoginDTO} from "../types/LoginDTO";
import type {RegistroDTO} from "../types/RegistroDTO";
import { loginApi, registerApi } from "../api/auth";
import { oauth2Sucesso } from "../api/oauth2";

interface AuthContextType {
    user: string | null;
    token: string | null;
    login: (data: LoginDTO) => Promise<void>;
    register: (data: RegistroDTO) => Promise<void>;
    logout: () => void;
    loginOAuth2: (token: string) => Promise<void>; // Corrigido!
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(storedUser);
    }, []);

    const login = async (data: LoginDTO) => {
        const token = await loginApi(data);
        setToken(token);
        setUser(data.email);
        localStorage.setItem("token", token);
        localStorage.setItem("user", data.email);
    };

    const register = async (data: RegistroDTO) => {
        const token = await registerApi(data);
        setToken(token);
        setUser(data.email);
        localStorage.setItem("token", token);
        localStorage.setItem("user", data.email);
    };

    // OAuth2 login: chama o endpoint, recebe o token, salva no contexto
    const loginOAuth2 = async () => {
        const token = await oauth2Sucesso();
        setToken(token);
        // Não temos o e-mail no frontend, então o usuário pode ser null ou extraído do JWT se necessário
        setUser(null);
        localStorage.setItem("token", token);
        localStorage.removeItem("user"); // Limpa o user pois não temos o e-mail direto
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            register,
            logout,
            loginOAuth2,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};