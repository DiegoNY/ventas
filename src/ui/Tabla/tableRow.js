import React from 'react';

function TablaRow({ children }) {

    return (
        <>
            <div
                className='table-row'
            >
                {children}
            </div>
        </>
    )

}

export { TablaRow }