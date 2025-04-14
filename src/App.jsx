// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage.jsx';
import Inicio from './pages/inicioPage.jsx';
import ListaDeBancos from './pages/listaDeBancos.jsx';
import MovimientoBancario from './pages/movimientoBancarios.jsx';
import Proveedores from './pages/proveedores.jsx';
import OrdenDePago from './pages/ordenDePago.jsx';
import PantallaConSidebar from './components/pantallaConSidebar.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="inicio" element={<Inicio />} />

        {/* Rutas que comparten el Sidebar */}
        <Route element={<PantallaConSidebar />}>
          <Route path="listaDeBancos" element={<ListaDeBancos />} />
          <Route path="movimientoBancarios" element={<MovimientoBancario />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="ordenDePago" element={<OrdenDePago />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
