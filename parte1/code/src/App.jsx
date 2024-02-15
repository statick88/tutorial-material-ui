import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import "@fontsource/roboto";

function App() {
  return (
    <div className="App">
      <h1>Hola, este es un tutorial de MUI</h1>
      <p>
        MUI es una biblioteca de componentes de React que implementa el diseño
        de Material
      </p>
      <Button variant="contained" color="primary" startIcon={<GitHubIcon />}>
        Ver código en GitHub
      </Button>
    </div>
  );
}

export default App;
