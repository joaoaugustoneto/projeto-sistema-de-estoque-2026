import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function StockList() {
  const { products, deleteProduct, loading } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [deleteTarget, setDeleteTarget] = useState(null); // holds product object to delete

  // 1. Search filter
  const filteredProducts = products.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.descricao && p.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 2. Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.nome.localeCompare(b.nome);
      case 'name-desc':
        return b.nome.localeCompare(a.nome);
      case 'price-asc':
        return Number(a.preco) - Number(b.preco);
      case 'price-desc':
        return Number(b.preco) - Number(a.preco);
      case 'qty-asc':
        return Number(a.quantidade) - Number(b.quantidade);
      case 'qty-desc':
        return Number(b.quantidade) - Number(a.quantidade);
      default:
        return 0;
    }
  });

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      await deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const getStockBadge = (qty) => {
    const q = Number(qty);
    if (q === 0) return <span className="badge badge-danger">Esgotado</span>;
    if (q < 10) return <span className="badge badge-warning">Estoque Baixo</span>;
    return <span className="badge badge-success">Em Estoque</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Inventário de Estoque</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Gerencie, filtre, atualize ou remova produtos registrados.</p>
        </div>
        <Link to="/estoque/adicionar" className="btn btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Adicionar Produto
        </Link>
      </div>

      {/* Filter and Search Panel */}
      <div className="glass-card filter-bar">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Pesquisar por nome ou descrição..." 
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500, whiteSpace: 'nowrap' }}>Ordenar por:</label>
          <select 
            className="filter-select" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name-asc">Nome (A - Z)</option>
            <option value="name-desc">Nome (Z - A)</option>
            <option value="price-asc">Preço (Menor primeiro)</option>
            <option value="price-desc">Preço (Maior primeiro)</option>
            <option value="qty-asc">Estoque (Menor primeiro)</option>
            <option value="qty-desc">Estoque (Maior primeiro)</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Produto</th>
                <th>Descrição</th>
                <th>Preço Unitário</th>
                <th>Qtd. Estoque</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    Nenhum produto encontrado correspondente aos critérios.
                  </td>
                </tr>
              ) : (
                sortedProducts.map((p) => (
                  <tr key={p.id}>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>#{p.id}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.nome}</div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.descricao || '—'}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      R$ {Number(p.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ fontWeight: 600 }}>{p.quantidade}</td>
                    <td>{getStockBadge(p.quantidade)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <Link 
                          to={`/estoque/editar/${p.id}`} 
                          className="btn btn-secondary btn-icon"
                          title="Editar"
                          style={{ padding: '6px' }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent-primary)' }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </Link>
                        <button 
                          onClick={() => setDeleteTarget(p)}
                          className="btn btn-secondary btn-icon"
                          title="Excluir"
                          style={{ padding: '6px' }}
                          disabled={loading}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-danger)' }}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <div className="modal-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px' }}>Você tem certeza?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '8px' }}>
              Esta ação excluirá permanentemente o produto <strong>{deleteTarget.nome}</strong>.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Esta operação não pode ser desfeita.</p>
            
            <div className="modal-actions">
              <button onClick={() => setDeleteTarget(null)} className="btn btn-secondary">
                Cancelar
              </button>
              <button onClick={handleDeleteConfirm} className="btn btn-danger">
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
