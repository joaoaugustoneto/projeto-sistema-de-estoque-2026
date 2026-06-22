import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Listagem() {
  const { products, deleteProduct } = useApp();
  const [erro, setErro] = useState('');

  const handleDelete = async (id) => {
    setErro('');
    try {
      await deleteProduct(id);
    } catch (err) {
      setErro('Não foi possível excluir o produto.');
    }
  };

  return (
    <div className="glass" style={{ padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
      <h2>📋 Itens Cadastrados em Estoque</h2>
      {erro && (
        <div style={{ color: '#fff', backgroundColor: 'rgba(239,68,68,0.2)', padding: '14px', borderRadius: '12px', margin: '18px 0' }}>
          {erro}
        </div>
      )}
      <div style={{ overflowX: 'auto', marginTop: '18px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              <th style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>ID</th>
              <th style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Nome</th>
              <th style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Descrição</th>
              <th style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Quantidade</th>
              <th style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Preço</th>
              <th style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Nenhum produto em estoque encontrado.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>#{p.id}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>{p.nome}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.descricao || '-'}</td>
                  <td style={{ padding: '14px 16px' }}>{p.quantidade}</td>
                  <td style={{ padding: '14px 16px' }}>R$ {Number(p.preco).toFixed(2)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      onClick={() => handleDelete(p.id)}
                      style={{
                        background: 'rgba(239,68,68,0.15)',
                        color: '#ef4444',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '8px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
