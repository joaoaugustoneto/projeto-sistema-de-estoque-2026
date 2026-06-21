import { useState, useEffect } from 'react';

export default function Listagem() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const buscarProdutos = async () => {
    try {
      const response = await fetch(`${API_URL}/produtos`);
      if (response.ok) {
        const data = await response.json();
        setProdutos(data);
      } else {
        setErro('Erro ao processar a lista vinda do banco.');
      }
    } catch (err) {
      setErro('Não foi possível conectar à API de Estoque.');
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--card-bg)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>📋 Itens Cadastrados em Estoque</h2>
      {erro && <div style={{ color: 'white', backgroundColor: 'var(--error-color)', padding: '10px', borderRadius: '4px', margin: '15px 0' }}>{erro}</div>}
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '12px', borderBottom: '2px solid var(--border-color)' }}>ID</th>
            <th style={{ padding: '12px', borderBottom: '2px solid var(--border-color)' }}>Nome</th>
            <th style={{ padding: '12px', borderBottom: '2px solid var(--border-color)' }}>Descrição</th>
            <th style={{ padding: '12px', borderBottom: '2px solid var(--border-color)' }}>Quantidade</th>
            <th style={{ padding: '12px', borderBottom: '2px solid var(--border-color)' }}>Preço</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr><td colSpan="5" style={{ padding: '12px', textAlign: 'center', color: '#999' }}>Nenhum produto em estoque encontrado.</td></tr>
          ) : (
            produtos.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>{p.id}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}><strong>{p.nome}</strong></td>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>{p.descricao}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>{p.quantidade}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>R$ {Number(p.preco).toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}