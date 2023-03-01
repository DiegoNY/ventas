import React from 'react';

function TablaRow({ children, tabIndex, onClick, onFocus, onKeyDown, onMouseLeave, className }) {

    return (
        <>
            <div
                className={`table-row hover:bg-sky-100 ${className}`}
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