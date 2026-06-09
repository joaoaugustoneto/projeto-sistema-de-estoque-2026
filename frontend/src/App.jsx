import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu'; // Importação correta da pasta de componentes
import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Chamada do Componente do Menu isolado */}
        <Menu />

        {/* Gerenciador de Rotas SPA */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/listagem" element={<Listagem />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;