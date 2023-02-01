import React from 'react';

function TablaRow({ children, tabIndex, onClick, onFocus,onKeyDown }) {

    return (
        <>
            <div
                className='table-row hover:bg-gray-200'
                tabIndex={tabIndex}
                onFocus={onFocus}
                onClick={onClick}
                onKeyDown={onKeyDown}

            >
                {children}
            </div>
        </>
    )

}

export { TablaRow }