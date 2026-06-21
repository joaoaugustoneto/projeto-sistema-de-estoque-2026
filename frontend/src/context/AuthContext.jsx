import React, { createContext, useState, useEffect } from 'react';

/**
 * Contexto de Autenticação
 * Fornece o estado do usuário logado e funções de login/logout
 * de forma global para toda a árvore de componentes da aplicação.
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Controla estado de loading inicial

    // Efeito para carregar dados do usuário persistidos no localStorage ao abrir o app
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    /**
     * Efetua o login salvando token e dados do usuário na sessão
     * @param {Object} userData - Dados do usuário (id, nome, email)
     * @param {string} token - Token JWT recebido da API
     */
    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    /**
     * Efetua o logout limpando a sessão e o estado do usuário
     */
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
