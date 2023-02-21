import React, { Children, useEffect } from 'react';
import { useLocalStorage } from '../../routes/useLocalStorage';

const MyContextMenu = React.createContext();

const ProviderMenu = ({ children }) => {
    const [comprimir, setComprimir] = React.useState(false);
    const [apertura, setApertura] = React.useState(true);

    const [aperturoDiaHoy, setAperturaDiaHoy] = React.useState(true);

    const {
        item: moneyInBox,
        saveItem: saveMoneyInBox,
        loading,
        error
    } = useLocalStorage('BOX_V1', []);




    useEffect(() => {
        console.log(loading);
        if (!loading) {
            let hoy = new Date();
            let fecha_apertura = new Date(moneyInBox.fecha_consultas)
            if (hoy != fecha_apertura) {
                console.log("es igual")
                setAperturaDiaHoy(false)
            } else {
                setAperturaDiaHoy(false);
            };
            console.log(hoy)
            console.log(fecha_apertura)
        }
        console.log(moneyInBox);
    }, [loading])


    return (
        <MyContextMenu.Provider value={{ comprimir, setComprimir, apertura, setApertura, aperturoDiaHoy, setAperturaDiaHoy }}>
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

