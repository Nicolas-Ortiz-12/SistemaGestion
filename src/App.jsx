import Login from './pages/loginPage.jsx'
import Inicio from './pages/inicioPage.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App(){
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path='inicio' element={<Inicio/>}/>
      </Routes>
    </BrowserRouter>
  );
}
  export default App
