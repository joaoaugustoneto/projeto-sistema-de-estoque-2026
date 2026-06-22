import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import { ProductContext } from '../context/ProductContext';

/**
 * Página de Estoque (Listagem)
 * Exibe unicamente a tabela de dados, permitindo redirecionar para edição ou exclusão.
 */
const Estoque = () => {
    const { produtos, loading, error, removeProduto } = useContext(ProductContext);
    const navigate = useNavigate();

    const formatCurrency = (value) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const handleEdit = (produto) => {
        // Redireciona para a página de cadastro passando o produto via state router
        navigate('/cadastro', { state: { produto } });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            await removeProduto(id);
        } catch (err) {
            alert(err.message || 'Erro ao excluir o produto');
        }
    };

    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <div className="page-header">
                    <h2>Listagem de Estoque</h2>
                    <p>Acompanhe todos os itens disponíveis no seu armazém.</p>
                </div>

                {error && <div className="error-alert">{error}</div>}

                {loading ? (
                    <div className="loading-state">Carregando produtos...</div>
                ) : (
                    <ProductList
                        produtos={produtos}
                        formatCurrency={formatCurrency}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </main>
        </div>
    );
};

export default Estoque;
