import { useState } from "react";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TablePagination,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

function App() {
  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", age: 25, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 30, email: "jane@example.com" },
    { id: 3, name: "Tom Brown", age: 35, email: "tom@example.com" },
    { id: 4, name: "Alice Johnson", age: 40, email: "alice@example.com" },
    { id: 5, name: "Bob Williams", age: 45, email: "bob@example.com" },
  ]);

  const columns = [
    { id: "name", label: "Nombre", minWidth: 100 },
    { id: "age", label: "Edad", minWidth: 100 },
    { id: "email", label: "Correo electrónico", minWidth: 200 },
    { id: "actions", label: "Acciones", minWidth: 100 },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", age: "", email: "" });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedUser(null);
    setNewUser({ name: "", age: "", email: "" });
  };

  const handleAddUser = () => {
    setRows([...rows, { id: rows.length + 1, ...newUser }]);
    handleCloseDialog();
  };

  const handleEditUser = () => {
    const updatedRows = rows.map((row) => {
      if (row.id === selectedUser.id) {
        return { ...row, ...newUser };
      }
      return row;
    });
    setRows(updatedRows);
    handleCloseDialog();
  };

  const handleDeleteUser = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleEditButtonClick = (user) => {
    setSelectedUser(user);
    setNewUser(user);
    setOpen(true);
  };

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditButtonClick(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteUser(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}-${to === -1 ? count : to} of ${count}`;
        }}
        labelRowsPerPage={
          <span style={{ color: "white" }}>Rows per page:</span>
        }
        style={{ color: "white" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        startIcon={<AddIcon />}
      >
        Agregar Usuario
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedUser ? "Editar Usuario" : "Agregar Usuario"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Edad"
            fullWidth
            value={newUser.age}
            onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Correo electrónico"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={selectedUser ? handleEditUser : handleAddUser}
            color="primary"
          >
            {selectedUser ? "Guardar Cambios" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
