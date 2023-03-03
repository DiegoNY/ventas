import React, { Children, useEffect, useState } from 'react';
import { useAuth } from '../../auth/auth';
import { urlAPI } from '../../config';
import { getData } from '../../routes/useFetch';
import { useLocalStorage } from '../../routes/useLocalStorage';

const MyContextMenu = React.createContext();

const ProviderMenu = ({ children }) => {

    const [comprimir, setComprimir] = React.useState(false);
    const [apertura, setApertura] = React.useState(true);
    const [cierre, setCierre] = React.useState(false);
    const [dineroCaja, setDineroCaja] = React.useState(true);
    const [loadingState, setLoadingState] = React.useState(false);
    const [mostrarProductosStockMinimo, setMostrarProductosStockMinimo] = React.useState(false);
    const [aperturoDiaHoy, setAperturaDiaHoy] = React.useState(true);
    const [salida, setSalida] = React.useState(false);
    const [historial, setHistorial] = React.useState(false);
    const [productos, setProductos] = React.useState();
    const [loading, setLoading] = useState(true);
    const [moneyInBox, setMoneyInbox] = useState();

    const {
        item: moneyInBoxs,
        saveItem: saveMoneyInBox,
    } = useLocalStorage('BOX_V1', []);

    const {

        item: user,
        loading: userLoading,
        error,

    } = useLocalStorage('USER_V2');

    useEffect(() => {
        const informacionCaja = async () => {
            const data = await getData(`${urlAPI.Caja.url}?aperturo=${user?._id}`)
            setLoading(false);
            setMoneyInbox(data[0]);
        }

        if (!userLoading) {
            informacionCaja();
        }
    }, [userLoading])

    useEffect(() => {

        if (!loading) {

            let hoy = new Date();


            let fechaHoy = `${hoy.toISOString()}`.substring(0, 10)
            let fechaApertura = `${moneyInBox?.fecha_consultas}`.substring(0, 10);
            if (fechaHoy != fechaApertura) {
                setAperturaDiaHoy(false)
            };

            if (moneyInBox.tipo == "CIERRE") {
                setCierre(true);
            };

            if (moneyInBox.dinero || moneyInBox.dinero == 0) {
                setDineroCaja(true);
                setApertura(true);
            } else {
                setDineroCaja(false);
            };


        }

        setLoadingState(loading);


    }, [loading])

    useEffect(() => {

        if (error) {
            setDineroCaja(false);
            setLoadingState(false);
        }
    }, [error])



    return (
        <MyContextMenu.Provider
            value={{
                comprimir, setComprimir,
                apertura, setApertura,
                aperturoDiaHoy, setAperturaDiaHoy,
                cierre, setCierre,
                dineroCaja, setDineroCaja,
                loadingState, setLoadingState,
                mostrarProductosStockMinimo, setMostrarProductosStockMinimo,
                salida, setSalida,
                historial, setHistorial,
                productos, setProductos,
                moneyInBox, loading
            }}
        >
            {children}
        </MyContextMenu.Provider >
    )
}

const useMain = () => {
    const main = React.useContext(MyContextMenu);
    return main;
}

export {
    ProviderMenu,
    useMain,
}

