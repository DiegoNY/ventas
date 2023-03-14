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
import { ReporteGanancias } from './reportes/ganancias/ReporteGanancias';
import { Informacion } from '../ui/Error';
import { Reporte } from './Caja/reporte/Reporte';
import { Perfil } from './usuario/Perfil';


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
      console.log('ACA ')
      navigate("/caja");
      return;
    }


  }, [contextosGlobales])

  // Rutas °° 🍅

  return (
    <>


      <NavBar>

        <MainUser />
      </NavBar>



      <div className='page-content' >

        <Main />

        <div className='content-wrapper '

          onClick={() => {
            contextosGlobales.setComprimir(false);
            contextosGlobales.setMostrarProductosStockMinimo(false);
            contextosGlobales.setHistorial(false)
            contextosGlobales.setSalida(false)
            contextosGlobales.setPerfil(false);
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
                path='/caja-reporte'
                element={<Reporte />}
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
              <Route
                path='/reporte-ganancias'
                element={<ReporteGanancias />}
              />
              <Route
                path='/usuario-perfil'
                element={<Perfil />}
              />

            </Routes>

          </div>

        </div>

        {contextosGlobales.loadingState &&

          < PantallaCarga />
        }
        {contextosGlobales.productos &&
          <Informacion
            onClick={() => contextosGlobales.setProductos('')}
          >
            <div
              className='grid  '
            >
              <div
                className='font-black  tracking-tighter p-1 border-b pb-2 border-b-slate-200 flex justify-between'
              >
                <p>Productos vendidos</p>
                <div
                  className='cursor-pointer'
                  onClick={() => contextosGlobales.setProductos('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className='p-1 pt-2'>Nro ° Venta : {contextosGlobales.productos.numero} </p>
              <div className='max-h-80 overflow-y-auto grid'>
                <table className='mx-1 mt-2'>
                  <thead className='border-b border-b-slate-200 text-center'>
                    <th>Codigo de producto</th>
                    <th>Producto</th>
                    <th>Cantidad </th>
                    <th>Precio </th>
                    <th>Total </th>
                  </thead>
                  <tbody className=''>

                    {contextosGlobales.productos.productos.map(producto => {

                      return (
                        <tr className='text-center border-b border-b-slate-200 h-10'>
                          <td className='text-sky-400 font-black'>{producto.codigo_barras}</td>
                          <td>{producto.descripcion}</td>
                          <td>{producto.stock_vendido} {producto.medida}</td>
                          <td>S/{producto.precio}</td>
                          <td> <p className='border-x border-y text-green-500 border-green-500 rounded-lg '>S/ {producto.total}</p></td>
                        </tr>
                      )
                    })}



                  </tbody>
                </table>
              </div>
            </div>
          </Informacion>
        }

        {contextosGlobales.reporte &&
          <Informacion
            onClick={() => contextosGlobales.setReporte('')}
          >
            <div> {contextosGlobales.reporte}</div>
          </Informacion>
        }

      </div>






    </>
  );
}


export default App;
