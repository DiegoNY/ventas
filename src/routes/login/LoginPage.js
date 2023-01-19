import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth';
import './login.css';



function Login() {

    const auth = useAuth();
    /**
     * Estados 
     */
    const [user, setUser] = React.useState({});

    /**
     * se valida la informacion del usuario   
     */

    const login = (e) => {

        e.preventDefault();

        auth.login({
        
            username: user.usuario,
            password: user.contraseña
        
        })

    }


    return (
        <>


            <div className="login">

                <div className="form-container">

                    <form
                        className="form"
                        onSubmit={login}
                    >
                        <label
                            for="email"
                            className="label"
                        >
                            Usuario
                        </label>

                        <input
                            type="text"
                            id="email"
                            placeholder="Usuario"
                            className="input input-email"
                            name="txtUsuario"
                            onChange={(e) => setUser({ usuario: e.target.value })}

                        />

                        <label
                            for="password"
                            className="label"
                        >
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="pasword"
                            placeholder="*********"
                            className="input input-password"
                            name="txtContraseña"
                            onChange={(e) => setUser({ ...user, contraseña: e.target.value })}
                        />

                        <input
                            type="submit"
                            value="Ingresar"
                            className="primary-button bg-gray-900 login-button"
                            id="btnIngresarUsuarios"

                        />

                        <a href="#">Nombre Empresa </a>
                    </form>

                </div>

            </div>

        </>


    );
}

export { Login };