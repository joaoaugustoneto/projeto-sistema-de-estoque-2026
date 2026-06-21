import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Componente Navbar
 * Exibe o logo e os controles de usuário logado (nome e botão de sair).
 */
const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar glass">
            <div className="navbar-brand">
                <h1>📦 StockManager</h1>
            </div>
            {user && (
                <div className="navbar-user">
                    <span>Olá, <strong>{user.nome}</strong></span>
                    <button onClick={logout} className="btn-logout">Sair</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
