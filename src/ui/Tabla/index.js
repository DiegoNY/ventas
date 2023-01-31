import React, { useEffect, useRef } from 'react';
import { Grid } from "gridjs";
import { _ } from "gridjs-react";

import "gridjs/dist/theme/mermaid.css";


let gridExpor = "";

function Table(props) {


    const wrapperRef = useRef(null);

    const [reload, setReload] = React.useState(false);


    const grid = new Grid({
        columns: [{
            id: 'button',
            name: _(props.button),
            columns: props.columns
        }

        ],
        search: true,
        server: {
            method: 'GET',
            url: props.url,
            then: props.modelo,

        },

        pagination: {
            limit: 7,
        },
        className: {
            th: 'bg-orange-500',
            table: 'w-100',
        },
        language: {
            'search': {
                'placeholder': 'Buscar por ...',
            },
            'pagination': {
                'previous': '⬅',
                'next': '⬅',
                'showing': 'Mostrando',
                'results': () => 'Records'
            }
        }
    });


    gridExpor = grid;
    // Crea el botón y agrégalo como un nodo secundario del elemento de búsqueda


    useEffect(() => {


        grid.render(wrapperRef.current);


    }); 

 

    return (
        <>
            <div ref={wrapperRef} />

        </>
    );

}
export {
    Table,
    gridExpor,

}