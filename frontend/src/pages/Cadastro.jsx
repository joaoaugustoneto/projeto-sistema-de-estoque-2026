import { useState } from 'react';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const lidarComCadastro = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    if (quantidade < 0 || preco < 0) {
      setMensagem({ tipo: 'erro', texto: 'Quantidade e Preço não podem ser negativos!' });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao, quantidade: Number(quantidade), preco: Number(preco) }),
      });

      if (response.ok) {
        setMensagem({ tipo: 'sucesso', texto: '🎁 Produto cadastrado com sucesso no estoque!' });
        setNome(''); setDescricao(''); setQuantidade(0); setPreco(0);
      } else {
        const dadosErro = await response.json();
        setMensagem({ tipo: 'erro', texto: dadosErro.error || 'Erro ao cadastrar.' });
      }
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: 'Erro ao conectar-se com o servidor da API.' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--card-bg)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>➕ Adicionar Novo Produto ao Estoque</h2>
      
      {mensagem.texto && (
        <div style={{ 
          padding: '10px', 
          borderRadius: '4px', 
          color: 'white', 
          backgroundColor: mensagem.tipo === 'erro' ? 'var(--error-color)' : 'var(--success-color)',
          margin: '15px 0'
        }}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={lidarComCadastro} style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
        <input type="text" placeholder="Nome do Produto" value={nome} onChange={(e) => setNome(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
        <textarea placeholder="Descrição curta do item" value={descricao} onChange={(e) => setDescricao(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '80px' }} />
        <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
        <input type="number" step="0.01" placeholder="Preço Unitário" value={preco} onChange={(e) => setPreco(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
        <button type="submit" style={{ padding: '12px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar Registro</button>
      </form>
    </div>
  );
}