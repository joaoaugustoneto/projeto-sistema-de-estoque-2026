import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DEFAULT_PRODUCTS = [
  { id: 1, nome: 'Notebook Dell Inspiron', descricao: 'Processador Intel i7, 16GB RAM, SSD 512GB', quantidade: 12, preco: 4500.0 },
  { id: 2, nome: 'Monitor LG 29" UltraWide', descricao: 'Monitor IPS Full HD com HDR10 e 75Hz', quantidade: 5, preco: 1250.9 },
  { id: 3, nome: 'Teclado Mecânico HyperX Alloy', descricao: 'Teclado Switch Red, Layout ABNT2, RGB', quantidade: 25, preco: 450.0 },
  { id: 4, nome: 'Mouse Logitech MX Master 3S', descricao: 'Mouse sem fio ergonômico com sensor de 8K DPI', quantidade: 3, preco: 620.0 },
  { id: 5, nome: 'Fone de Ouvido Sony WH-1000XM4', descricao: 'Headphone Bluetooth com Noise Cancelling', quantidade: 8, preco: 1800.0 },
  { id: 6, nome: 'Webcam Logitech C920s Pro', descricao: 'Câmera Full HD 1080p com microfone integrado', quantidade: 0, preco: 380.0 },
];

export function AppProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('stock_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/produtos`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        localStorage.setItem('stock_products', JSON.stringify(data));
      } else {
        throw new Error('Erro ao buscar produtos da API.');
      }
    } catch (err) {
      console.warn('Modo offline: usando dados locais.', err.message);
      const saved = localStorage.getItem('stock_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        localStorage.setItem('stock_products', JSON.stringify(DEFAULT_PRODUCTS));
        setProducts(DEFAULT_PRODUCTS);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stock_products', JSON.stringify(products));
  }, [products]);

  const addProduct = async (product) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        await fetchProducts();
      } else {
        throw new Error('Erro ao adicionar produto na API.');
      }
    } catch (err) {
      console.warn('Modo offline: adicionando produto localmente.', err.message);
      const newProduct = {
        ...product,
        id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
        preco: Number(product.preco),
        quantidade: Number(product.quantidade),
      };
      setProducts((prev) => [...prev, newProduct]);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        await fetchProducts();
      } else {
        throw new Error('Erro ao atualizar produto na API.');
      }
    } catch (err) {
      console.warn('Modo offline: atualizando produto localmente.', err.message);
      setProducts((prev) => prev.map((p) => {
        if (p.id === Number(id) || p.id === id) {
          return {
            ...p,
            ...updatedData,
            preco: Number(updatedData.preco),
            quantidade: Number(updatedData.quantidade),
          };
        }
        return p;
      }));
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchProducts();
      } else {
        throw new Error('Erro ao excluir produto na API.');
      }
    } catch (err) {
      console.warn('Modo offline: excluindo produto localmente.', err.message);
      setProducts((prev) => prev.filter((p) => p.id !== id && p.id !== Number(id)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <AppContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
}
