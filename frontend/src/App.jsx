import {BrowserRouter, Routes, Route } from 'react-router-dom'
import PagLogin from './paginas/PagLogin'
import PagRegistro from './paginas/PagRegistro'
import SolicitudPrestamo from './paginas/SolicitudPrestamo'
import HomePage from './paginas/HomePage';
import PagCatalogo from './paginas/PagCatalogo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<PagLogin/>} />
          <Route path='/registro' element={<PagRegistro/>} />
          <Route path='/prestamo' element={<SolicitudPrestamo/>} />
          <Route path='/catalogo' element={<PagCatalogo/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
