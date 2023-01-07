import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth';

function PanelControl() {
    
    /**
     * Obteniendo los datos del usuario
     * 
     * @navigate funcion que cambia las rutas  
     */

    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth.user) navigate('/');


    return (
        <div className='card'>

            Panel de control

        </div>
    );

}

export { PanelControl }