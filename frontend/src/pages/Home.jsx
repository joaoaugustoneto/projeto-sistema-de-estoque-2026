import React, { useContext, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { ProductContext } from '../context/ProductContext';

/**
 * Página Início (Home)
 * Exibe um dashboard com informações resumidas do estoque.
 */
const Home = () => {
    const { produtos, loading, error } = useContext(ProductContext);

    // Cálculos derivados usando useMemo para performance
    const totalProdutos = produtos.length;
    
    const valorPatrimonial = useMemo(() => {
        return produtos.reduce((acc, curr) => acc + (curr.preco * curr.quantidade), 0);
    }, [produtos]);

    const formatCurrency = (value) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <div className="page-header">
                    <h2>Início</h2>
                    <p>Visão geral do seu sistema de gestão.</p>
                </div>

                {error && <div className="error-alert">{error}</div>}

                {loading ? (
                    <div className="loading-state">Carregando dados...</div>
                ) : (
                    <div className="stats-grid">
                        <div className="stat-card glass">
                            <h3>Total de Itens Cadastrados</h3>
                            <p className="stat-value">{totalProdutos}</p>
                        </div>
                        <div className="stat-card glass">
                            <h3>Valor Patrimonial Total</h3>
                            <p className="stat-value highlight">{formatCurrency(valorPatrimonial)}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
