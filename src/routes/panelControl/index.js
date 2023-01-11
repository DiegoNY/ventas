import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth';
import BarChart from '../../ui/Graficos';
import { UserDat } from '../../ui/Graficos/data';


function PanelControl() {

    /**
     * Obteniendo los datos del usuario
     * 
     * @navigate funcion que cambia las rutas  
     */

    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth.user) navigate('/');

    const [userData, setUserData] = useState({
        labels: UserDat.map((data) => data.year),
        datasets: [{
            label: "Productos mas vendidos",
            data: UserDat.map((data) => data.useGain),

        }]
    })

    return (
        <div className='card'>

            Panel de control
            <div className='w-50 h-60'>
                <BarChart chartData={userData} />
            </div>

        </div>
    );

}

export { PanelControl }