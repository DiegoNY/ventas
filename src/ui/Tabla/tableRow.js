import React from 'react';

function TablaRow({ children, tabIndex, onClick, onFocus,onKeyDown,onMouseLeave }) {

    return (
        <>
            <div
                className='table-row hover:bg-gray-200'
                tabIndex={tabIndex}
                onFocus={onFocus}
                onClick={onClick}
                onKeyDown={onKeyDown}
                onMouseLeave={onMouseLeave}

            >
                {children}
            </div>
        </>
    )

}

export { TablaRow }