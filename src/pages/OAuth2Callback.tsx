import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { oauth2Sucesso } from "../api/oauth2";
import { useAuth } from "../context/AuthContext";

export default function OAuth2Callback() {
    const { loginOAuth2 } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const processOAuth2 = async () => {
            const token = await oauth2Sucesso();
            loginOAuth2(token); // Certifique-se que loginOAuth2 aceita argumento
            navigate("/dashboard");
        };
        processOAuth2();
    }, [loginOAuth2, navigate]);

    return <div>Autenticando via Google/GitHub...</div>;
}