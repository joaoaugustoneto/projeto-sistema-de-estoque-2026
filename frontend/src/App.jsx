import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import StockList from './pages/StockList';
import StockForm from './pages/StockForm';

// Route guard for authenticated users
function PrivateRoute({ children }) {
  const { currentUser } = useApp();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

// Route guard for non-authenticated users (redirect to dashboard if logged in)
function PublicRoute({ children }) {
  const { currentUser } = useApp();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/cadastro" 
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } 
          />

          {/* Protected Stock System Routes */}
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/estoque" 
            element={
              <PrivateRoute>
                <StockList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/estoque/adicionar" 
            element={
              <PrivateRoute>
                <StockForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/estoque/editar/:id" 
            element={
              <PrivateRoute>
                <StockForm />
              </PrivateRoute>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;