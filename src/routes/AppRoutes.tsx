import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SimulacaoPage from "../pages/SimulacaoPage";
import DashboardPage from "../pages/DashboardPage";
import OAuth2Callback from "../pages/OAuth2Callback";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/simulacao" element={<SimulacaoPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Rota para o callback de sucesso do OAuth2 */}
            <Route path="/auth/oauth2/sucesso" element={<OAuth2Callback />} />
        </Routes>
    );
}