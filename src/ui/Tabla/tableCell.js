import React from 'react';

const TableCell = React.memo(({ children, className }) => {
    // console.log(className);
    return (
        <>
            <div className={`table-cell text-center ${className}`}> {children} </div>
        </>
    )
})

export { TableCell }