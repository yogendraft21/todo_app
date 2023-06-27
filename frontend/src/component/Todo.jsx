import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const currentDate = new Date().toLocaleString();

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setTodoDescription(event.target.value);
  };

  const handleAddTodo = () => {
    if (todoTitle.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        title: todoTitle,
        description: todoDescription,
      };

      setTodos([...todos, newTodo]);
      setTodoTitle('');
      setTodoDescription('');
    }
  };

  const handleUpdateTodo = (id, field, value) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, [field]: value } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Box width="400px" bgcolor="white" boxShadow={2} p={2} mb={4} mt={-50}>
        <Typography variant="h5" gutterBottom>
          Add Todo
        </Typography>
        <TextField
          label="Title"
          value={todoTitle}
          onChange={handleTitleChange}
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
            width="200px"
            height="200px"
            bgcolor="white"
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
            <Typography
              variant="h6"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                maxWidth: '100%',
              }}
            >
              {todo.title}
            </Typography>
            <Typography
              variant="body1"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                maxWidth: '100%',
              }}
            >
              {todo.description}
            </Typography>
            <Typography
              variant="caption"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                maxWidth: '100%',
              }}
            >
              {currentDate}
            </Typography>
            <Box display="flex" justifyContent="center">
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
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Todo;
