import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUserId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUserId ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      setSelectedUserId(null);
    } else {
      const newUser = { id: Date.now(), ...formData };
      setUsers([...users, newUser]);
    }
    setFormData({ name: "", email: "" });
  };

  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    setFormData({ name: user.name, email: user.email });
    setSelectedUserId(id);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Mi Aplicación con Temas Personalizados
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                name="email"
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                {selectedUserId !== null ? "Actualizar" : "Agregar"}
              </Button>
              {selectedUserId !== null && (
                <Button
                  onClick={() => setSelectedUserId(null)}
                  variant="outlined"
                  color="primary"
                >
                  Cancelar
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo electrónico</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(user.id)}
                      variant="outlined"
                      color="primary"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant="outlined"
                      color="secondary"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={toggleDarkMode} variant="outlined" color="primary">
          {darkMode ? "Tema Claro" : "Tema Oscuro"}
        </Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
