import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import icono_ticket from '../lista_ventas/img/icono-ticket.svg';
import icono_pdf from '../lista_ventas/img/icono-pdf.svg';
import { getData } from '../../useFetch';
import { urlAPI } from '../../../config';

function CustomToolbar() {

    return (

        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}



function ListadoSalida() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    const [notas, setNotas] = useState([]);



    const columns = [
        {
            field: '_id',
            headerName: 'Id',
            flex: 0.3,
        },
        {
            field: 'numeroDocumento',
            headerName: 'Codigo nota salida',
            flex: 0.2,
            headerClassName: ''
            

        },
        {
            field: 'tipo',
            headerName: 'Tipo de  nota',
            flex: 0.1,
            headerClassName: '',


        },
        {
            field: 'solicitante',
            headerName: 'Solicitante',
            flex: 0.2,
            headerClassName: '',

        },
        {
            field: 'fecha',
            headerName: 'Fecha salida',
            flex: 0.2,
            headerClassName: '',


        },
        {
            field: 'motivo',
            headerName: 'Motivo',
            flex: 0.3,
            headerClassName: '',
        },
        {
            field: 'fecha_registro',
            headerName: 'Fecha registro',
            flex: 0.2,
            headerClassName: '',
        },
        {
            field: 'Imprimir',
            headerName: 'Imprimir',
            flex: 0.1,
            headerClassName: '',
            renderCell: (params) => {
                return (
                    <div
                        className='flex justify-between w-full mx-2'
                        onMouseEnter={() => {
                            // setInformacionImpresion(params.row)
                        }}
                    >
                       
                        <div
                            className='flex font-semibold text-xs text-orange-500 	 cursor-pointer'
                            onClick={(e) => {
                                // imprimirPDF();
                            }}
                        >
                            PDF
                            <img src={icono_pdf} className=' h-4 ' />
                        </div>
                    </div>
                )
            }
        },
       
    ]


    useEffect(() => {
        const getNotasSalida = async () => {
            const data = await getData(`${urlAPI.Nota_salida.url}`);
            setNotas(data);
        }

        getNotasSalida();
    }, [])

    return (
        <>

            <div
                className='
                
                    grid
                    h-screen
                    grid-cols-12
                '
            >
                <div
                    className='
                        col-span-12
                        flex
                        flex-col
                    '
                >
                    <div
                        className='
                            //bg-red-200
                            flex
                            flex-col
                            justify-center
                            my-2
                            mx-2
                    '
                    >

                        <h1 className='
                            ml-2 
                            text-2xl 
                            sm:text-2xl 
                            font-extrabold 
                            text-slate-900 
                            tracking-tight  
                        '>
                            Notas de salida
                        </h1>
                        <p className='ml-2 font-normal text-sm  text-slate-500'>Recuerda que estas observando todas las notas de salidas registradas </p>
                    </div>

                    <div
                        className='
                        //bg-yellow-200
                        col-span-4
                        row-span-5
                        mx-3
                        mt-2
                        h-full
                        flex
                        flex-col
                    '
                    >

                        <DataGrid
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            getRowId={(row) => row._id}
                            rows={notas}
                            density='compact'
                            columns={columns}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            initialState={
                                {
                                    columns: {
                                        columnVisibilityModel: {
                                            _id: false
                                        }
                                    }
                                }
                            }

                        />

                    </div>


                </div>

            </div>
        </>
    );
}

export { ListadoSalida }