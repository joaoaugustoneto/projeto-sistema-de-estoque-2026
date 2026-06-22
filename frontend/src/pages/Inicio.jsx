export default function Inicio() {
  return (
    <div className="glass" style={{ padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
      <h1>🏠 Início - Painel de Controle</h1>
      <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>
        Bem-vindo ao <strong>StockManager</strong>. Use o menu superior para navegar entre o cadastro de novos itens e a visualização do estoque atual em tempo real.
      </p>
    </div>
  );
}
