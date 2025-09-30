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

            console.log("🔐 DEBUG - Carregando do localStorage:", {
                storedToken: storedToken ? "Presente" : "Ausente",
                storedUser: storedUser ? "Presente" : "Ausente"
            });

            if (storedToken) {
                setToken(storedToken);
                console.log("🔐 DEBUG - Token definido no state");
            }
            
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    console.log("🔐 DEBUG - Usuário parseado do localStorage:", parsedUser);
                    console.log("🔐 DEBUG - ID do usuário parseado:", parsedUser.id);
                    
                    setUser(parsedUser);
                    console.log("🔐 DEBUG - Usuário definido no state");
                } catch (error) {
                    console.error("Erro ao parsear usuário do localStorage:", error);
                    localStorage.removeItem("user");
                }
            }
        }, []);

        const login = async (data: LoginDTO) => {
            try {
                const { token, usuario } = await loginApi(data);
                console.log("🔐 DEBUG - Salvando no localStorage:", usuario);
                
                setToken(token);
                setUser(usuario);
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(usuario));
                
                console.log("🔐 DEBUG - Login concluído, usuário no state:", usuario);
            } catch (err) {
                console.error("Erro ao fazer login:", err);
                throw err;
            }
        };

    // Registro de novo usuário
    const register = async (data: RegistroDTO) => {
        try {
            const { token, usuario } = await registerApi(data); // <-- agora retorna {token, usuario}
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
    const loginOAuth2 = (data: { token: string; usuario: Usuario; provider: string }) => {
        setToken(data.token);
        setUser(data.usuario);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.usuario));
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