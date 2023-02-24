import React, { Children, useEffect } from 'react';
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

    const {
        item: moneyInBox,
        saveItem: saveMoneyInBox,
        loading,
        error
    } = useLocalStorage('BOX_V1', []);


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

            if (moneyInBox.dinero) {
                setDineroCaja(true);
            } else {
                setDineroCaja(false);
            };


        }

        setLoadingState(loading);


    }, [loading])

    useEffect(() => {
        console.log(error);
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

