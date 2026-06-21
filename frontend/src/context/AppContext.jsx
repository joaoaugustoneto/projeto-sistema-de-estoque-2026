import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DEFAULT_PRODUCTS = [
  { id: 1, nome: 'Notebook Dell Inspiron', descricao: 'Processador Intel i7, 16GB RAM, SSD 512GB', quantidade: 12, preco: 4500.00 },
  { id: 2, nome: 'Monitor LG 29" UltraWide', descricao: 'Monitor IPS Full HD com HDR10 e 75Hz', quantidade: 5, preco: 1250.90 },
  { id: 3, nome: 'Teclado Mecânico HyperX Alloy', descricao: 'Teclado Switch Red, Layout ABNT2, RGB', quantidade: 25, preco: 450.00 },
  { id: 4, nome: 'Mouse Logitech MX Master 3S', descricao: 'Mouse sem fio ergonômico com sensor de 8K DPI', quantidade: 3, preco: 620.00 },
  { id: 5, nome: 'Fone de Ouvido Sony WH-1000XM4', descricao: 'Headphone Bluetooth com Noise Cancelling', quantidade: 8, preco: 1800.00 },
  { id: 6, nome: 'Webcam Logitech C920s Pro', descricao: 'Câmera Full HD 1080p com microfone integrado', quantidade: 0, preco: 380.00 },
];

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('stock_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('stock_registered_users');
    return saved ? JSON.parse(saved) : [
      { name: 'Administrador', email: 'admin@stock.com', password: 'admin' } // default user
    ];
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('stock_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from API or fallback to localStorage
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
      console.warn('Conectando no modo Offline. Usando dados locais.', err.message);
      // Fallback is already loaded in the state, but we sync it
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

  // Sync products state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('stock_products', JSON.stringify(products));
  }, [products]);

  // Sync users to local storage
  useEffect(() => {
    localStorage.setItem('stock_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Authentication logic
  const loginUser = (email, password) => {
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const loggedUser = { name: user.name, email: user.email };
      setCurrentUser(loggedUser);
      localStorage.setItem('stock_user', JSON.stringify(loggedUser));
      return true;
    }
    throw new Error('E-mail ou senha incorretos.');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('stock_user');
  };

  const registerUser = (name, email, password) => {
    const exists = registeredUsers.some(u => u.email === email);
    if (exists) {
      throw new Error('E-mail já cadastrado.');
    }
    const newUser = { name, email, password };
    setRegisteredUsers(prev => [...prev, newUser]);
    return true;
  };

  // Product CRUD
  const addProduct = async (product) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        // Sync with API
        await fetchProducts();
      } else {
        throw new Error('API return error status');
      }
    } catch (err) {
      console.warn('Salvando produto no modo Offline.', err.message);
      // Fallback local insert
      const newProduct = {
        ...product,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        preco: Number(product.preco),
        quantidade: Number(product.quantidade)
      };
      setProducts(prev => [...prev, newProduct]);
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
        // Sync with API
        await fetchProducts();
      } else {
        throw new Error('API returned error status on update');
      }
    } catch (err) {
      console.warn('Atualizando produto no modo Offline.', err.message);
      // Fallback local update
      setProducts(prev => prev.map(p => {
        if (p.id === Number(id) || p.id === id) {
          return {
            ...p,
            ...updatedData,
            preco: Number(updatedData.preco),
            quantidade: Number(updatedData.quantidade)
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
        // Sync with API
        await fetchProducts();
      } else {
        throw new Error('API returned error status on delete');
      }
    } catch (err) {
      console.warn('Deletando produto no modo Offline.', err.message);
      // Fallback local delete
      setProducts(prev => prev.filter(p => p.id !== id && p.id !== Number(id)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <AppContext.Provider value={{
      currentUser,
      products,
      loading,
      error,
      loginUser,
      logoutUser,
      registerUser,
      addProduct,
      updateProduct,
      deleteProduct,
      refreshProducts: fetchProducts
    }}>
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
