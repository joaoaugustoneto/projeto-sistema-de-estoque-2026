export default function Inicio() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1>🏠 Início - Painel de Controle</h1>
      <p style={{ marginTop: '10px', color: '#666' }}>
        Bem-vindo ao <strong>StockManager</strong>. Use o menu superior para navegar entre o cadastro de novos itens e a visualização do estoque atual em tempo real.
      </p>
    </div>
  );
}