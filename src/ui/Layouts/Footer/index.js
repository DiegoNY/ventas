import React from 'react';

const Footer = React.memo(({ children, className }) => {

    return (
        <>
            <div
                className='
                    border-t-2
                    col-span-12
                    row-span-2
                    mx-3
                '
            >
                <div
                    className='h-14'
                >
                    {children}
                </div>

            </div>
        </>
    )
})

export { Footer }