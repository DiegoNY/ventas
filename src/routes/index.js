import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom'
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
import { PuntoVenta } from './ventas/punto_venta';
import { ListaVenta } from './ventas/lista_ventas';
import { ProductosMasVendidos } from './ventas/productos_mas_vendidos';
import { NotaSalida } from './ventas/nota_salida';
import { ListadoSalida } from './ventas/listado_salida';
import { RegistroCompras } from './compras/RegistroCompras';
import { ListaCompra } from './compras/ListaCompras';
import { RegistrarGastos } from './gastos/RegistrarGastos';
import { ListaGastos } from './gastos/ListaGastos';
import { useMain } from '../ui/main/useMain';
import { Reporteventas } from './reportes/ventas';
import { ReporteVentasCompras } from './reportes/ventasCompras';
import { Kardex } from './reportes/kardex';
import { VentasMensuales } from './reportes/ventasMensuales';
import { StockProductos } from './reportes/stockProductos';
import { ProductosVencidosVencer } from './reportes/productosVencidosVencer';
import { PantallaCarga } from '../ui/Layouts/PantallaCarga';


function App() {

  const contextosGlobales = useMain();

  const navigate = useNavigate();



  useEffect(() => {

    if (contextosGlobales.aperturoDiaHoy == false) {
      navigate("/caja-cierre");
      return;
    }

    if (!!contextosGlobales.cierre) {
      navigate("/caja");
      return;
    }

    if (!contextosGlobales.dineroCaja) {

      navigate("/caja");
      return;
    }

    
  }, [contextosGlobales])

  console.log(contextosGlobales);

  // Rutas °° 🍅

  return (
    <>

      <AuthProvider>

        <NavBar>

          <MainUser />
        </NavBar>



        <div className='page-content' >

          <Main />

          <div className='content-wrapper '

            onClick={() => {
              contextosGlobales.setComprimir(false);
            }}

          >

            <div className='content-inner h-screen	bg-white' id='scroll' >

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
                >
                </Route>
                <Route
                  path='/caja-cierre'
                  element={<Caja cierre={true} />}
                >
                </Route>

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
                  path='/venta-punto_venta'
                  element={<PuntoVenta />}
                />
                <Route
                  path='/venta-lista_venta'
                  element={<ListaVenta />}
                />
                <Route
                  path='/venta-productos_mas_vendidos'
                  element={<ProductosMasVendidos />}
                />
                <Route
                  path='/venta-nota_salida'
                  element={<NotaSalida />}
                />
                <Route
                  path='/venta-listado_salida'
                  element={<ListadoSalida />}
                />
                <Route
                  path='/compras-registro_compras'
                  element={<RegistroCompras />}
                />
                <Route
                  path='/compras-lista_compras'
                  element={<ListaCompra />}
                />
                <Route
                  path='*'
                  element={<PanelControl />}

                />
                <Route
                  path='/gastos'
                  element={<RegistrarGastos />}
                />
                <Route
                  path='/gastos-listado'
                  element={<ListaGastos />}
                />
                <Route
                  path='/reporte-ventas'
                  element={<Reporteventas />}
                />
                <Route
                  path='/reporte-ventas-mensuales'
                  element={<VentasMensuales />}
                />
                <Route
                  path='/reporte-ventas-compras'
                  element={<ReporteVentasCompras />}
                />
                <Route
                  path='/reporte-productos'
                  element={<StockProductos />}
                />
                <Route
                  path='/reporte-kardex'
                  element={<Kardex />}
                />
                <Route
                  path='/reporte-productos-vencidos-vencer'
                  element={<ProductosVencidosVencer />}
                />

              </Routes>

            </div>

          </div>

          {contextosGlobales.loadingState &&

            < PantallaCarga />
          }

        </div>




      </AuthProvider>


    </>
  );
}


export default App;
