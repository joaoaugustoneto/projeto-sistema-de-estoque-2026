import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthService } from '../services/api';

/**
 * Página de Login
 * Componente responsável por autenticar o usuário no sistema.
 */
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Estado local para os inputs do formulário
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Manipulador de submissão do formulário de login
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await AuthService.login(email, senha);
            // Salva no contexto global (e localStorage) e redireciona para a raiz
            login(data.user, data.token);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Credenciais inválidas');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass">
                <h2>StockManager</h2>
                <p className="subtitle">Faça login para continuar</p>
                
                {error && <div className="error-alert">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>E-mail</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            placeholder="admin@exemplo.com"
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Senha</label>
                        <input 
                            type="password" 
                            value={senha} 
                            onChange={e => setSenha(e.target.value)} 
                            placeholder="••••••••"
                            required 
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-primary full-width">
                        {isLoading ? 'Acessando...' : 'Entrar'}
                    </button>
                </form>
                
                <p className="auth-link">
                    Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
