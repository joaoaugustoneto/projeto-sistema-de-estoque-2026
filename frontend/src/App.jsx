import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

/**
 * Componente ProtectedRoute
 * Verifica se o usuário está autenticado antes de renderizar a rota.
 * Caso não esteja, redireciona para /login.
 */
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Exibe nada enquanto verifica sessão salva no localStorage
    if (loading) return null;

    return user ? children : <Navigate to="/login" replace />;
};

/**
 * Componente App raiz
 * Define o roteamento da aplicação, protegendo rotas autenticadas.
 */
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Rotas Públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Rota Protegida - requer autenticação */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback para rotas não encontradas */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;