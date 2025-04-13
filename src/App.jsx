import Login from './pages/loginPage.jsx';
import Inicio from './pages/inicioPage.jsx';
import ListaDeBancos from './pages/listaDeBancos.jsx';
import MovimientoBancario from './pages/movimientoBancarios.jsx';
import Proveedores from "./pages/proveedores.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App(){
  return (
    <BrowserRouter>
      <Routes>
      <Route path="" element={<Login/>} />
      <Route path='inicio' element={<Inicio/>}/>
      <Route path='listaDeBancos' element={<ListaDeBancos/>}/>
      <Route path='movimientoBancarios' element={<MovimientoBancario/>}/>
      <Route path='proveedores' element={<Proveedores/>}/>
      </Routes>
    </BrowserRouter>
  );
}
  export default App
