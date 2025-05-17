import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage.jsx';
import Inicio from './pages/inicioPage.jsx';
import ListaDeBancos from './pages/listaDeBancos.jsx';
import MovimientoBancario from './pages/movimientoBancarios.jsx';
import Proveedores from './pages/proveedores.jsx';
import OrdenDePago from './pages/ordenDePago.jsx';
import PantallaConSidebar from './components/pantallaConSidebar.jsx';
import GenerarOrdenDePago from "./pages/generarOrdenDePago.jsx";
import Reportes from './pages/reportes.jsx'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="inicio" element={<Inicio />} />
        <Route path="generarOrdenDePago" element={<GenerarOrdenDePago />} />

        <Route element={<PantallaConSidebar />}>
          <Route path="listaDeBancos" element={<ListaDeBancos />} />
          <Route path="movimientoBancarios" element={<MovimientoBancario />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="ordenDePago" element={<OrdenDePago />} />
          <Route path="reportes" element={<Reportes />} /> {/* 👈 agregado */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
