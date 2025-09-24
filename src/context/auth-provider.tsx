import React, { useState, useEffect } from "react";
import type { LoginDTO } from "../types/LoginDTO";
import type { RegistroDTO } from "../types/RegistroDTO";
import { loginApi, registerApi } from "../api/auth";
import { AuthContext } from "./auth-context";

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
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};