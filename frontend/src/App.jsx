import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PagLogin from './paginas/PagLogin';
import PagRegistro from './paginas/PagRegistro';
import SolicitudPrestamo from './paginas/SolicitudPrestamo';
import HomePage from './paginas/HomePage';
import PagCatalogo from './paginas/PagCatalogo';

import { AuthProvider } from './contexto/AuthContext';

import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<PagLogin />} />
          <Route path='/registro' element={<PagRegistro />} />
          <Route path='/catalogo' element={<PagCatalogo />} />

          <Route element= {<ProtectedRoute/>}>
            <Route path='/prestamo' element={<SolicitudPrestamo />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </AuthProvider>
  );
}

export default App
