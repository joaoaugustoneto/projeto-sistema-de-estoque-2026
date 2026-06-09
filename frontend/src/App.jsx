import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* COMPONENTE OBRIGATÓRIO: Menu de Navegação */}
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

        {/* Gerenciador de Rotas SPA */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cadastro" element={<element <Cadastro />} />
          <Route path="/listagem" element={<Listagem />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;