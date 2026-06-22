import React, { createContext, useState, useEffect, useContext } from 'react';
import { ProductService } from '../services/api';
import { AuthContext } from './AuthContext';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Busca os produtos assim que o usuário estiver logado
    useEffect(() => {
        if (user) {
            fetchProdutos();
        } else {
            setProdutos([]); // Limpa se deslogar
        }
    }, [user]);

    const fetchProdutos = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await ProductService.getAll();
            setProdutos(data || []);
        } catch (err) {
            setError('Erro ao carregar produtos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const addProduto = async (produtoData) => {
        try {
            const novoProduto = await ProductService.create(produtoData);
            // Atualiza o estado global sem precisar fazer novo fetch (Estado Compartilhado)
            setProdutos((prev) => [novoProduto, ...prev]);
            return novoProduto;
        } catch (err) {
            throw err;
        }
    };

    const editProduto = async (id, produtoData) => {
        try {
            const produtoEditado = await ProductService.update(id, produtoData);
            setProdutos((prev) => prev.map(p => p.id === id ? produtoEditado : p));
            return produtoEditado;
        } catch (err) {
            throw err;
        }
    };

    const removeProduto = async (id) => {
        try {
            await ProductService.delete(id);
            setProdutos((prev) => prev.filter(p => p.id !== id));
        } catch (err) {
            throw err;
        }
    };

    return (
        <ProductContext.Provider value={{
            produtos,
            loading,
            error,
            fetchProdutos,
            addProduto,
            editProduto,
            removeProduto
        }}>
            {children}
        </ProductContext.Provider>
    );
};
