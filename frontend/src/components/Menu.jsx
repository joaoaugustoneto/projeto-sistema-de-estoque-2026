import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav style={{ 
      backgroundColor: '#343a40', 
      padding: '15px 20px', 
      borderRadius: '8px', 
      marginBottom: '20px',
      display: 'flex',
      gap: '20px',
      color: 'white',
      fontWeight: 'bold'
    }}>
      <Link to="/" style={{ padding: '5px 10px', borderRadius: '4px' }}>🏠 Início</Link>
      <Link to="/cadastro" style={{ padding: '5px 10px', borderRadius: '4px' }}>➕ Cadastrar Item</Link>
      <Link to="/listagem" style={{ padding: '5px 10px', borderRadius: '4px' }}>📋 Ver Estoque</Link>
    </nav>
  );
}