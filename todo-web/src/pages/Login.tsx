import React, { useState, useContext } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  Paper,
  Link
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Chamada para o seu endpoint do ASP.NET
      const response = await api.post('/Auth/login', { username, password });
      
      // Se sucesso, usamos a função login do contexto para guardar o token
      login(response.data.token);
    } catch (err: any) {
      setError(err.response?.data || 'Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Gerenciador de Tarefas
          </Typography>
          <Typography component="h2" variant="body1" align="center" color="textSecondary" gutterBottom>
            Faça login para continuar
          </Typography>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Usuário"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
            >
              Entrar
            </Button>
            <Box textAlign="center">
              <Link href="/register" variant="body2" sx={{ cursor: 'pointer', textDecoration: 'none' }}>
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;