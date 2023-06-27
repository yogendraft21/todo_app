import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');
  const [editTodoDescription, setEditTodoDescription] = useState('');

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setTodoDescription(event.target.value);
  };

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        title: todoText,
        description: todoDescription,
        dateTime: new Date().toLocaleString(),
        color: getRandomColor(),
      };

      setTodos([...todos, newTodo]);
      setTodoText('');
      setTodoDescription('');
    }
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditingTodoId(id);
      setEditTodoText(todo.title);
      setEditTodoDescription(todo.description);
    }
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodoId
        ? { ...todo, title: editTodoText, description: editTodoDescription }
        : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditTodoText('');
    setEditTodoDescription('');
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const getRandomColor = () => {
    const colors = ['#FCE4EC', '#E8F5E9', '#FFFDE7', '#E1F5FE', '#F3E5F5'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
    //   justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      p={2}
      height="100vh"
    >
      <Box width="400px" bgcolor="white" boxShadow={2} p={2} mb={4}>
        <Typography variant="h5" gutterBottom>
          Add Todo
        </Typography>
        <TextField
          label="Title"
          value={todoText}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Description"
          value={todoDescription}
          onChange={handleDescriptionChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleAddTodo} fullWidth>
          Add Todo
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {todos.map((todo) => (
          <Box
            key={todo.id}
            width="250px"
            height="200px"
            bgcolor={todo.color}
            boxShadow={1}
            borderRadius={4}
            p={2}
            mr={2}
            mb={2}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            position="relative"
          >
            {editingTodoId === todo.id ? (
              <>
                <TextField
                  label="Title"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Description"
                  value={editTodoDescription}
                  onChange={(e) => setEditTodoDescription(e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateTodo}
                  fullWidth
                  style={{ marginTop: '8px' }}
                >
                  Done
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6" align="center">
                  {todo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  {todo.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  {todo.dateTime}
                </Typography>
              </>
            )}

            {!editingTodoId && (
              <Box display="flex" justifyContent="center" mt={1}>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '40%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleEditTodo(todo.id)}
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '40%',
                    transform: 'translateX(50%)',
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Todo;
