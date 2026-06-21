import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ id: null, nome: '', descricao: '', quantidade: '', preco: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar produtos.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        quantidade: Number(formData.quantidade),
        preco: Number(formData.preco)
      };

      if (formData.id) {
        await api.updateProduct(formData.id, payload);
      } else {
        await api.createProduct(payload);
      }
      
      setFormData({ id: null, nome: '', descricao: '', quantidade: '', preco: '' });
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar produto.');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      nome: product.nome,
      descricao: product.descricao || '',
      quantidade: product.quantidade,
      preco: product.preco
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Deseja realmente excluir este produto?')) return;
    try {
      await api.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir produto.');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>📦 StockManager</h1>
        <p>Gestão de Estoque Inteligente e Centralizada</p>
      </header>

      <div className="content-grid">
        <section className="glass-panel form-section">
          <h2>{formData.id ? 'Editar Produto' : 'Novo Produto'}</h2>
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>Nome do Produto</label>
              <input 
                type="text" 
                name="nome" 
                className="form-control" 
                value={formData.nome} 
                onChange={handleInputChange} 
                required 
                placeholder="Ex: Teclado Mecânico"
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <textarea 
                name="descricao" 
                className="form-control" 
                value={formData.descricao} 
                onChange={handleInputChange}
                placeholder="Detalhes adicionais..."
              ></textarea>
            </div>
            <div className="form-group">
              <label>Quantidade</label>
              <input 
                type="number" 
                name="quantidade" 
                className="form-control" 
                value={formData.quantidade} 
                onChange={handleInputChange} 
                required 
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Preço (R$)</label>
              <input 
                type="number" 
                name="preco" 
                className="form-control" 
                value={formData.preco} 
                onChange={handleInputChange} 
                required 
                min="0" 
                step="0.01"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {formData.id ? 'Salvar Alterações' : 'Cadastrar Produto'}
            </button>
            {formData.id && (
              <button 
                type="button" 
                className="btn btn-small" 
                style={{ marginTop: '10px', background: 'transparent', border: '1px solid var(--border)', color: 'white' }}
                onClick={() => setFormData({ id: null, nome: '', descricao: '', quantidade: '', preco: '' })}
              >
                Cancelar Edição
              </button>
            )}
          </form>
        </section>

        <section className="glass-panel list-section">
          <h2>Inventário Atual</h2>
          <div className="table-container" style={{ marginTop: '20px' }}>
            {loading ? (
              <div className="empty-state">Carregando estoque...</div>
            ) : products.length === 0 ? (
              <div className="empty-state">Nenhum produto cadastrado ainda.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Preço Unit.</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td style={{ color: 'var(--text-secondary)' }}>#{product.id}</td>
                      <td>
                        <strong>{product.nome}</strong>
                        {product.descricao && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            {product.descricao.substring(0, 30)}{product.descricao.length > 30 ? '...' : ''}
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '12px', 
                          background: product.quantidade > 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: product.quantidade > 0 ? '#4ade80' : '#f87171',
                          fontWeight: '500',
                          fontSize: '0.85rem'
                        }}>
                          {product.quantidade} un.
                        </span>
                      </td>
                      <td>R$ {Number(product.preco).toFixed(2)}</td>
                      <td className="actions">
                        <button className="btn btn-small btn-primary" onClick={() => handleEdit(product)}>Editar</button>
                        <button className="btn btn-small btn-danger" onClick={() => handleDelete(product.id)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
