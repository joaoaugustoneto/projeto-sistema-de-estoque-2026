import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function StockForm() {
  const { id } = useParams(); // present if in Edit Mode
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, loading } = useApp();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0.0);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Pre-fill form if in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      const product = products.find(p => p.id === Number(id) || p.id === id);
      if (product) {
        setNome(product.nome);
        setDescricao(product.descricao || '');
        setQuantidade(Number(product.quantidade));
        setPreco(Number(product.preco));
      } else {
        setErrorMsg('Produto não encontrado.');
      }
    }
  }, [id, isEditMode, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validation
    if (Number(quantidade) < 0) {
      setErrorMsg('A quantidade em estoque não pode ser negativa.');
      return;
    }

    if (Number(preco) < 0) {
      setErrorMsg('O preço unitário não pode ser negativo.');
      return;
    }

    const productData = {
      nome,
      descricao,
      quantidade: Number(quantidade),
      preco: Number(preco)
    };

    try {
      if (isEditMode) {
        await updateProduct(id, productData);
        setSuccessMsg('🎁 Produto atualizado com sucesso no estoque!');
      } else {
        await addProduct(productData);
        setSuccessMsg('🎁 Produto cadastrado com sucesso no estoque!');
        // Reset form in add mode
        setNome('');
        setDescricao('');
        setQuantidade(0);
        setPreco(0.0);
      }
      
      // Redirect back to stock list after a short delay
      setTimeout(() => {
        navigate('/estoque');
      }, 1500);
    } catch (err) {
      setErrorMsg('Ocorreu um erro ao salvar as alterações no produto.');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header with back navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/estoque" className="btn btn-secondary btn-icon" title="Voltar para estoque" style={{ borderRadius: '50%', padding: '10px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </Link>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
            {isEditMode ? 'Editar Produto' : 'Cadastrar Produto'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            {isEditMode ? `Modificando informações do produto ID #${id}` : 'Insira os dados para registrar um novo item no estoque.'}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="glass-card">
        {errorMsg && (
          <div className="alert alert-danger" style={{ marginBottom: '24px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success" style={{ marginBottom: '24px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label htmlFor="nome">Nome do Produto *</label>
            <input 
              type="text" 
              id="nome" 
              className="form-control" 
              placeholder="Ex: Teclado Mecânico RGB" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required 
              disabled={loading || !!successMsg}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição Detalhada</label>
            <textarea 
              id="descricao" 
              className="form-control" 
              placeholder="Descreva as especificações do item..." 
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              disabled={loading || !!successMsg}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="quantidade">Quantidade em Estoque *</label>
              <input 
                type="number" 
                id="quantidade" 
                className="form-control" 
                placeholder="Ex: 15" 
                min="0"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required 
                disabled={loading || !!successMsg}
              />
            </div>

            <div className="form-group">
              <label htmlFor="preco">Preço Unitário (R$) *</label>
              <input 
                type="number" 
                step="0.01" 
                id="preco" 
                className="form-control" 
                placeholder="Ex: 299.90" 
                min="0"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required 
                disabled={loading || !!successMsg}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Link to="/estoque" className="btn btn-secondary" style={{ minWidth: '120px' }} disabled={loading || !!successMsg}>
              Cancelar
            </Link>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ minWidth: '160px' }}
              disabled={loading || !!successMsg}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: 'spin 1s linear infinite' }}><circle cx="12" cy="12" r="10" strokeDasharray="40" strokeDashoffset="10"></circle></svg>
                  Processando...
                </span>
              ) : isEditMode ? 'Atualizar Produto' : 'Salvar Registro'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
