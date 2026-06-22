import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const { addProduct, loading } = useApp();

  const lidarComCadastro = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    if (!nome.trim()) {
      setMensagem({ tipo: 'erro', texto: 'O nome do produto é obrigatório.' });
      return;
    }

    if (Number(quantidade) < 0 || Number(preco) < 0) {
      setMensagem({ tipo: 'erro', texto: 'Quantidade e preço não podem ser negativos.' });
      return;
    }

    try {
      await addProduct({
        nome: nome.trim(),
        descricao: descricao.trim(),
        quantidade: Number(quantidade),
        preco: Number(preco),
      });
      setMensagem({ tipo: 'sucesso', texto: 'Produto cadastrado com sucesso!' });
      setNome('');
      setDescricao('');
      setQuantidade(0);
      setPreco(0);
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: err.message || 'Não foi possível cadastrar o produto.' });
    }
  };

  return (
    <div className="glass" style={{ padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
      <h2>➕ Adicionar Novo Produto ao Estoque</h2>

      {mensagem.texto && (
        <div style={{
          padding: '12px',
          borderRadius: '12px',
          color: '#fff',
          backgroundColor: mensagem.tipo === 'erro' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)',
          margin: '18px 0',
        }}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={lidarComCadastro} style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
        />
        <textarea
          placeholder="Descrição curta do item"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'white', minHeight: '100px' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
            min="0"
            style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Preço Unitário"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            min="0"
            style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary" style={{ width: 'fit-content' }}>
          {loading ? 'Salvando...' : 'Salvar Registro'}
        </button>
      </form>
    </div>
  );
}
