import React, { Children } from 'react';

const MyContextMenu = React.createContext();

const ProviderMenu = ({ children }) => {
    const [comprimir, setComprimir] = React.useState(false);

    return (
        <MyContextMenu.Provider value={{ comprimir, setComprimir }}>
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

