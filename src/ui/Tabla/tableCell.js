import React from 'react';

function TableCell({ children , className }) {

    return (
        <>
            <div className={`table-cell text-center ${className}`}> {children} </div>
        </>
    )
}

export { TableCell }