import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

// Vamos criar essas páginas no próximo passo
// Por enquanto, usaremos placeholders simples
const DashboardPlaceholder = () => <div>Dashboard de Tarefas (Em breve)</div>;

// Componente para proteger rotas privadas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;
  if (!authenticated) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          {/* Caso o usuário digite qualquer outra coisa, volta pra Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;