import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, products } = useApp();

  // Calculations
  const totalQuantity = products.reduce((acc, p) => acc + Number(p.quantidade), 0);
  const totalValue = products.reduce((acc, p) => acc + (Number(p.preco) * Number(p.quantidade)), 0);
  const uniqueCount = products.length;

  const outOfStockItems = products.filter(p => Number(p.quantidade) === 0);
  const lowStockItems = products.filter(p => Number(p.quantidade) > 0 && Number(p.quantidade) < 10);
  
  const criticalCount = outOfStockItems.length + lowStockItems.length;

  // Get most critical items for dashboard notice board (max 5)
  const criticalList = [...outOfStockItems, ...lowStockItems].slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Welcome Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Olá, {currentUser?.name || 'Usuário'}! 👋</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Aqui está o resumo geral do seu estoque hoje.</p>
        </div>
        <div style={{ fontSize: '0.85rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', padding: '10px 16px', borderRadius: '10px', color: 'var(--text-secondary)' }}>
          Última atualização: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          </div>
          <div className="stat-details">
            <span className="stat-value">{uniqueCount}</span>
            <span className="stat-label">Produtos Únicos</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="stat-details">
            <span className="stat-value" style={{ color: 'var(--accent-secondary)' }}>
              R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="stat-label">Valor Total em Estoque</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div className="stat-details">
            <span className="stat-value">{totalQuantity}</span>
            <span className="stat-label">Itens Totais</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div className="stat-details">
            <span className="stat-value" style={{ color: criticalCount > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
              {criticalCount}
            </span>
            <span className="stat-label">Itens Críticos / Baixos</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        {/* Stock Levels Status */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Níveis de Estoque</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Distribuição visual da quantidade de itens em estoque.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px 0' }}>Nenhum produto cadastrado.</div>
            ) : (
              products.slice(0, 5).map(p => {
                const maxCap = 50; // Reference maximum capacity for graph percentage
                const percentage = Math.min((Number(p.quantidade) / maxCap) * 100, 100);
                
                let barColor = 'var(--color-success)';
                if (Number(p.quantidade) === 0) barColor = 'var(--color-danger)';
                else if (Number(p.quantidade) < 10) barColor = 'var(--color-warning)';

                return (
                  <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ fontWeight: 500 }}>{p.nome}</span>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {p.quantidade} {p.quantidade === 1 ? 'unidade' : 'unidades'}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: barColor, borderRadius: '4px', boxShadow: `0 0 10px ${barColor}aa`, transition: 'width 1s ease' }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {products.length > 5 && (
            <Link to="/estoque" style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, alignSelf: 'flex-start', marginTop: '10px' }}>
              Ver todos os {products.length} itens →
            </Link>
          )}
        </div>

        {/* Critical/Warnings Alerts */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Alertas e Atenção Requerida</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Itens com estoque esgotado ou abaixo do limite de segurança (10 unidades).</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {criticalList.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '100%', padding: '20px 0', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-success)', fontWeight: 600 }}>Tudo sob controle!</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nenhum item está com estoque baixo.</span>
              </div>
            ) : (
              criticalList.map(p => {
                const isOut = Number(p.quantidade) === 0;
                return (
                  <div key={p.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: isOut ? 'var(--color-danger-bg)' : 'var(--color-warning-bg)',
                    border: `1px solid ${isOut ? 'var(--color-danger-border)' : 'var(--color-warning-border)'}`
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.925rem' }}>{p.nome}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {isOut ? 'Esgotado' : `Estoque baixo: apenas ${p.quantidade} restando`}
                      </span>
                    </div>
                    <Link to={`/estoque/editar/${p.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      Reabastecer
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
