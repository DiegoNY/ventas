import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';

function ListadoSalida() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    return (
        <>
        </>
    );
}

export { ListadoSalida }