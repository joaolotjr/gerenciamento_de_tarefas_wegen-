import React, { useEffect, useState, useContext } from 'react';
import { 
  Container, Typography, Button, Box, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton, 
  Checkbox, Chip, Stack, TextField, MenuItem 
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, ExitToApp } from '@mui/icons-material';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import TaskModal from '../components/TaskModal';

// Definição do tipo da Tarefa (igual ao C#)
interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const { logout } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Carregar tarefas
  const fetchTasks = async () => {
    try {
      const url = filterCategory ? `/Tasks?category=${filterCategory}` : '/Tasks';
      const response = await api.get(url);
      setTasks(response.data);
    } catch (err) {
      console.error("Erro ao carregar tarefas", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filterCategory]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Deseja realmente excluir esta tarefa?")) {
      await api.delete(`/Tasks/${id}`);
      fetchTasks();
    }
  };

  const handleToggleComplete = async (task: Task) => {
    await api.put(`/Tasks/${task.id}`, {
      ...task,
      isCompleted: !task.isCompleted
    });
    fetchTasks();
  };

    // Função para abrir modal de criação
    const handleOpenCreate = () => {
    setCurrentTask(null);
    setModalOpen(true);
    };

    // Função para abrir modal de edição
    const handleOpenEdit = (task: Task) => {
    setCurrentTask(task);
    setModalOpen(true);
    };

    // Função unificada para salvar (POST ou PUT)
    const handleSaveTask = async (taskData: Task) => {
        try {
            if (taskData.id) {
            // Editar
            await api.put(`/Tasks/${taskData.id}`, taskData);
            } else {
            // Criar
            await api.post('/Tasks', taskData);
            }
            setModalOpen(false);
            fetchTasks(); // Recarrega a lista
        } catch (err) {
            alert("Erro ao salvar tarefa");
        }
    };

  

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Minhas Tarefas</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
            Nova Tarefa
          </Button>
          <Button variant="outlined" startIcon={<ExitToApp />} color="error" onClick={logout}>
            Sair
          </Button>
        </Stack>
      </Box>

      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Filtrar por Categoria"
          size="small"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ width: 250 }}
        />
        <Button onClick={() => setFilterCategory('')}>Limpar</Button>
      </Paper>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell width="5%">Status</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} hover>
                <TableCell>
                  <Checkbox 
                    checked={task.isCompleted} 
                    onChange={() => handleToggleComplete(task)}
                  />
                </TableCell>
                <TableCell sx={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                  {task.title}
                </TableCell>
                <TableCell>
                  <Chip label={task.category} size="small" color="primary" variant="outlined" />
                </TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell align="right">
                  <IconButton color="info" onClick={() => handleOpenEdit(task)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(task.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  Nenhuma tarefa encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TaskModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSaveTask}
        taskToEdit={currentTask}
        />
    </Container>    
  );
};

export default Dashboard;