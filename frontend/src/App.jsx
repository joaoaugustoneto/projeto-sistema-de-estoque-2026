import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';

const Layout = ({ children }) => (
  <div className="app-layout">
    <main className="main-content">
      <Menu />
      {children}
    </main>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Inicio /></Layout>} />
          <Route path="/cadastro" element={<Layout><Cadastro /></Layout>} />
          <Route path="/listagem" element={<Layout><Listagem /></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
