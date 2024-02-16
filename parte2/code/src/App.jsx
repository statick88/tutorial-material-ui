import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledList = styled(List)({
  marginTop: 16,
});

const StyledListItem = styled(ListItem)({
  borderBottom: "1px solid #f0f0f0",
});

const StyledListItemText = styled(ListItemText)({
  color: "white", // Change the text color to white
});

function App() {
  const [tasks, setTasks] = useState(["Tarea 1", "Tarea 2"]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Lista de tareas
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <TextField
          label="Nueva tarea"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          InputLabelProps={{
            style: { color: "white" } // Change the text color of the label to white
          }}
          InputProps={{
            style: { color: "white" } // Change the text color of the input to white
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Agregar tarea
        </Button>
      </form>
      <StyledList>
        {tasks.map((task, index) => (
          <StyledListItem key={index}>
            <StyledListItemText primary={task} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTask(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  );
}

export default App;
