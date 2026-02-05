import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Stack 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        background: 'linear-gradient(45deg, #1976d2 30%, #21cbf3 90%)' 
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={6} 
          sx={{ 
            p: 5, 
            textAlign: 'center', 
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          {/* Box para alinhar o Ícone e o Nome WEGEN */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, gap: 1 }}>
            <AssignmentIcon sx={{ fontSize: 60, color: '#1976d2' }} />
            <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', color: '#1976d2', letterSpacing: 2 }}>
              WEGEN
            </Typography>
          </Box>
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Gerenciamento De Tarefas 
          </Typography>
          
          <Typography variant="h6" color="textSecondary" paragraph sx={{ mb: 4 }}>
            Organize seu dia, aumente sua produtividade e gerencie suas tarefas de forma simples e segura.
          </Typography>

          <Stack direction="column" spacing={2}>
            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              onClick={() => navigate('/login')}
              sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            >
              Fazer Login
            </Button>
            
            <Button 
              variant="outlined" 
              size="large" 
              fullWidth
              onClick={() => navigate('/register')}
              sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            >
              Criar Nova Conta
            </Button>
          </Stack>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 4 }}>
            © 2026 Desenvolvido para Prova Técnica da WEGEN
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;