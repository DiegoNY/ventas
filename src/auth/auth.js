import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../routes/useLocalStorage';

/**
 * Se inicializa el contexto  los contextos se usan para que otros componentes puedan acceder a ellos
 */
const AuthContext = React.createContext();


function AuthProvider({ children }) {

    const navigate = useNavigate();

    const {

        item: user,
        saveItem: setUser,
        loading,
        error

    } = useLocalStorage('USER_V2');


    const login = ({ username, password }) => {

        console.log(username, password);
        console.log("validando");

        setUser({ nombre: username, cargo: "cargo", dni: 75447008 })
        
        navigate('/caja');

    }

    const logout = () => {
        setUser(null);
        navigate('/');
    }


    const auth = { user, login, logout, loading }

    return (
        <AuthContext.Provider
            value={auth}
        >
            {children}

        </AuthContext.Provider>
    );

}

function useAuth() {

    const auth = React.useContext(AuthContext);
    return auth;

}

export {

    AuthProvider,
    useAuth,

};