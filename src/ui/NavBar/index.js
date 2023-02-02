import React from 'react';


function NavBar({ children }) {

    return (
        <>
            {/* style={{background:'#002A8D'}} */}
            <div className='navbar  navbar-light grid grid-cols-12  h-16 ' >


                {children}

            </div>
        </>
    );

}

export { NavBar };