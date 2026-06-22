import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

// Páginas Públicas
import Login from './pages/Login';
import Register from './pages/Register';

// Páginas Privadas (Área Logada)
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Estoque from './pages/Estoque';

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
            <ProductProvider>
                <Router>
                    <Routes>
                        {/* Rotas Públicas */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Rotas Protegidas - requerem autenticação */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/cadastro"
                            element={
                                <ProtectedRoute>
                                    <Cadastro />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/estoque"
                            element={
                                <ProtectedRoute>
                                    <Estoque />
                                </ProtectedRoute>
                            }
                        />

                        {/* Fallback para rotas não encontradas */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Router>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;