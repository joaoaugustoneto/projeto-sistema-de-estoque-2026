import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';
import { ProductContext } from '../context/ProductContext';

/**
 * Página de Cadastro
 * Contém o formulário para adição ou edição de produtos.
 */
const Cadastro = () => {
    const { addProduto, editProduto } = useContext(ProductContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const [formData, setFormData] = useState({ nome: '', descricao: '', quantidade: 0, preco: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Verifica se recebemos um produto para edição via navegação (state)
    useEffect(() => {
        if (location.state && location.state.produto) {
            const p = location.state.produto;
            setIsEditing(true);
            setEditingId(p.id);
            setFormData({
                nome: p.nome,
                descricao: p.descricao || '',
                quantidade: p.quantidade,
                preco: p.preco
            });
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (isEditing) {
                await editProduto(editingId, formData);
                setSuccess('Produto atualizado com sucesso!');
                setTimeout(() => navigate('/estoque'), 1500); // Redireciona para a listagem
            } else {
                await addProduto(formData);
                setSuccess('Produto cadastrado com sucesso!');
                setFormData({ nome: '', descricao: '', quantidade: 0, preco: 0 });
            }
        } catch (err) {
            setError(err.message || 'Erro ao salvar o produto');
        }
    };

    const handleCancelEdit = () => {
        navigate('/estoque');
    };

    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <div className="page-header">
                    <h2>{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
                    <p>Preencha os dados corretamente para manter seu estoque atualizado.</p>
                </div>

                {error && <div className="error-alert">{error}</div>}
                {success && <div className="success-alert">{success}</div>}

                <div className="form-wrapper">
                    <ProductForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        isEditing={isEditing}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            </main>
        </div>
    );
};

export default Cadastro;