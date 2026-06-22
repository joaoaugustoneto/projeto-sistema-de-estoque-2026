import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Componente Navbar
 * Exibe o logo, menu de navegação e controles de usuário logado.
 */
const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar glass">
            <div className="navbar-brand">
                <h1>📦 StockManager</h1>
            </div>
            
            {user && (
                <div className="navbar-links">
                    <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} end>Início</NavLink>
                    <NavLink to="/cadastro" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Cadastro</NavLink>
                    <NavLink to="/estoque" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Estoque</NavLink>
                </div>
            )}

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
