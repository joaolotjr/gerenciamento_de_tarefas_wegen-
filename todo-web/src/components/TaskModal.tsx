import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem
} from '@mui/material';

interface Task {
  id?: number;
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
}

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  taskToEdit?: Task | null;
}

const TaskModal = ({ open, onClose, onSave, taskToEdit }: TaskModalProps) => {
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    category: '',
    isCompleted: false
  });

  // Efeito para preencher o formulário quando for edição
  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({ title: '', description: '', category: '', isCompleted: false });
    }
  }, [taskToEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title) return;
    onSave(task);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
      </DialogTitle>
      
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título da Tarefa"
            fullWidth
            required
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Categoria"
            fullWidth
            placeholder="Ex: Trabalho, Estudos, Casa"
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            multiline
            rows={3}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            {taskToEdit ? 'Salvar Alterações' : 'Criar Tarefa'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TaskModal;