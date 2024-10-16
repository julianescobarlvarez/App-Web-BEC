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
          <Route path='/tareas' element={<h1>Tareas</h1>} />
          <Route path='/agregarTarea' element={<h1>Nueva Tarea</h1>} />
          <Route path='/tarea/:id' element={<h1>Actualizar Tarea</h1>} />
          <Route path='/perfil' element={<h1>Perfil</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
