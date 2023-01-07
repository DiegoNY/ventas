import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom'
import { Caja } from './Caja/Caja';
import { Login } from './login/LoginPage';
import { AuthProvider } from '../auth/auth';
import { PanelControl } from './panelControl';
import { Main } from '../ui/main';
import { NavBar } from '../ui/NavBar';
import { MainUser } from '../ui/main-user';
import { MantenimientoCliente } from './Mantenimientos/cliente';

import './index.css';
import { MantenimientoLaboratorio } from './Mantenimientos/laboratorio';
import { MantenimientoMoneda } from './Mantenimientos/moneda';
import { MantenimientoProveedor } from './Mantenimientos/proveedor';
import { MantenimientoUsuario } from './Mantenimientos/usuario';
import { MantenimientoProducto } from './Mantenimientos/producto';
import { MantenimientoTipoDocumento } from './Mantenimientos/tipo-documento';
function App() {

  // Rutas °° 🍅

  return (
    <>
      <BrowserRouter>

        <AuthProvider>

          <NavBar>
            <MainUser />
          </NavBar>

          <div className='page-content' id='scroll'>

            <Main />

            <div className='content-wrapper'>

              <div className='content-inner h-100' id='scroll'>

                <Routes>

                  <Route
                    path="/"
                    element={<Login />}
                  />
                  <Route
                    path="/home"
                    element={<PanelControl />}
                  />
                  <Route
                    path='/caja'
                    element={<Caja />}
                  />

                  <Route
                    path='/mantenimiento-tipo-documento'
                    element={< MantenimientoTipoDocumento />}
                  />
                  <Route
                    path='/mantenimiento-cliente'
                    element={<MantenimientoCliente />}
                  />
                  <Route
                    path='/mantenimiento-producto'
                    element={<MantenimientoProducto />}
                  />
                  <Route
                    path='/mantenimiento-usuarios'
                    element={<MantenimientoUsuario />}
                  />
                  <Route
                    path='/mantenimiento-laboratorio'
                    element={<MantenimientoLaboratorio />}
                  />
                  <Route
                    path='/mantenimiento-moneda'
                    element={<MantenimientoMoneda />}
                  />
                  <Route
                    path='/mantenimiento-proveedor'
                    element={<MantenimientoProveedor />}
                  />

                  <Route
                    path='*'
                    element={<Caja />}

                  />

                </Routes>

              </div>

            </div>

          </div>

        </AuthProvider>

      </BrowserRouter>

    </>
  );
}


export default App;
