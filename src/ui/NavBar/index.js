import React from 'react';


function NavBar({ children }) {

    return (
        <>
            {/* style={{background:'#002A8D'}} */}
            <div className=' bg-white border-b flex   h-16 ' >


                {children}

            </div>
        </>
    );

}

export { NavBar };