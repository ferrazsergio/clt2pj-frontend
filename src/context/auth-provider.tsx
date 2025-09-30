import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { LoginDTO } from "../types/LoginDTO";
import type { RegistroDTO } from "../types/RegistroDTO";
import type { Usuario } from "../types/Usuario";
import { loginApi, registerApi } from "../api/auth";

/**
 * AuthProvider: Fornece contexto de autenticação robusto.
 * - Persistência em localStorage
 * - Feedback de erros via console
 * - Pronto para extensões (loading, refresh, etc)
 */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Carrega dados do localStorage ao inicializar
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) setToken(storedToken);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Erro ao parsear usuário do localStorage:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    // Login tradicional (usuário/senha)
    const login = async (data: LoginDTO) => {
        try {
            const token = await loginApi(data);
            // Aqui você pode buscar perfil do usuário, se a API retornar.
            const usuario: Usuario = {
                id: "",
                email: data.email,
                senha: "",
                papeis: []
            };

            setToken(token);
            setUser(usuario);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(usuario));
        } catch (err) {
            console.error("Erro ao fazer login:", err);
            throw err;
        }
    };

    // Registro de novo usuário
    const register = async (data: RegistroDTO) => {
        try {
            const token = await registerApi(data);
            const usuario: Usuario = {
                id: "",
                email: data.email,
                senha: "",
                papeis: []
            };

            setToken(token);
            setUser(usuario);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(usuario));
        } catch (err) {
            console.error("Erro ao registrar:", err);
            throw err;
        }
    };

    // Login OAuth2 (Google/GitHub)
    const loginOAuth2 = (data: { token: string; usuario: string; provider: string }) => {
        const usuario: Usuario = {
            id: "",
            email: data.usuario,
            senha: "",
            papeis: []
        };

        setToken(data.token);
        setUser(usuario);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(usuario));
    };

    // Logout
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                loginOAuth2,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};