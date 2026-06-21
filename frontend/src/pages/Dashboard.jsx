import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { ProductService } from '../services/api';

/**
 * Página principal Dashboard
 * Orquestra os componentes de listagem e formulário de produtos.
 */
const Dashboard = () => {
    const [produtos, setProdutos] = useState([]);
    const [formData, setFormData] = useState({ nome: '', descricao: '', quantidade: 0, preco: 0 });
    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Carrega os produtos ao montar o componente
    useEffect(() => {
        fetchProdutos();
    }, []);

    /**
     * Busca todos os produtos na API e atualiza o estado.
     */
    const fetchProdutos = async () => {
        setLoading(true);
        try {
            const data = await ProductService.getAll();
            setProdutos(data);
        } catch (err) {
            setError('Erro ao carregar produtos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Formata um número como moeda brasileira (R$)
     */
    const formatCurrency = (value) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    /**
     * Submete o formulário para criar ou atualizar um produto.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editingProduct) {
                await ProductService.update(editingProduct.id, formData);
            } else {
                await ProductService.create(formData);
            }
            setFormData({ nome: '', descricao: '', quantidade: 0, preco: 0 });
            setEditingProduct(null);
            fetchProdutos();
        } catch (err) {
            setError(err.message);
        }
    };

    /**
     * Popula o formulário com os dados do produto a ser editado.
     */
    const handleEdit = (produto) => {
        setEditingProduct(produto);
        setFormData({
            nome: produto.nome,
            descricao: produto.descricao || '',
            quantidade: produto.quantidade,
            preco: produto.preco,
        });
    };

    /**
     * Exclui um produto após confirmação do usuário.
     */
    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            await ProductService.delete(id);
            fetchProdutos();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setFormData({ nome: '', descricao: '', quantidade: 0, preco: 0 });
    };

    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <div className="page-header">
                    <h2>Painel de Controle</h2>
                    <p>Gerencie seu inventário de forma simples e eficiente.</p>
                </div>

                {error && <div className="error-alert">{error}</div>}

                <div className="dashboard-grid">
                    <ProductForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        isEditing={!!editingProduct}
                        onCancelEdit={handleCancelEdit}
                    />
                    {loading ? (
                        <div className="loading-state">Carregando estoque...</div>
                    ) : (
                        <ProductList
                            produtos={produtos}
                            formatCurrency={formatCurrency}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
