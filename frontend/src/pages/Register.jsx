import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthService } from '../services/api';

/**
 * Página de Registro
 * Componente responsável pelo cadastro de novos usuários.
 */
const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Cria o usuário
            await AuthService.register(nome, email, senha);
            
            // Loga automaticamente após sucesso (opcional, pode-se exigir login manual)
            const data = await AuthService.login(email, senha);
            login(data.user, data.token);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Erro ao realizar o cadastro');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass">
                <h2>StockManager</h2>
                <p className="subtitle">Crie sua conta</p>
                
                {error && <div className="error-alert">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nome Completo</label>
                        <input 
                            type="text" 
                            value={nome} 
                            onChange={e => setNome(e.target.value)} 
                            placeholder="Seu nome"
                            required 
                        />
                    </div>
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
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
                
                <p className="auth-link">
                    Já tem uma conta? <Link to="/login">Faça Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
