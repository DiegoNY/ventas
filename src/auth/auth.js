import React from 'react';
import { useNavigate } from 'react-router-dom';
import { urlAPI } from '../config';
import { postData } from '../routes/useFetch';
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

    const login = async ({ username, password }) => {

        // console.log(username, password);
        const usuarioValidar = {
            usuario: username,
            contraseña: password
        }
        // console.log("validando");

        let Usuario = await postData(`${urlAPI.Usuario.url}?login=true`, usuarioValidar, false);
        if (Usuario.error == true) {
            return setUser(null);
        }

        setUser(Usuario[0].body)
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