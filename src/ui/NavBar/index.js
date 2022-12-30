import React from 'react';


function NavBar({ children }) {

    return (
        <>
            <div className='navbar navbar-expand-lg navbar-dark navbar-static h-16'>

                <div className="d-flex flex-1 d-lg-none">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                        <i className="icon-paragraph-justify3"></i>
                    </button>
                    <button className="navbar-toggler sidebar-mobile-main-toggle" type="button">
                        <i className="icon-transmission"></i>
                    </button>
                </div>

                <div className="navbar-brand text-center text-lg-left">
                    <a href="index.html" className="d-inline-block">
                        <img src="" className="d-none d-sm-block" alt="" />
                        <img src="" className="d-sm-none" alt="" />
                    </a>
                </div>

                <div className="collapse navbar-collapse order-2 order-lg-1" id="navbar-mobile">
                    <ul className="navbar-nav">


                    </ul>

                    <ul className="navbar-nav ml-lg-auto">

                    </ul>
                </div>

                <ul className="navbar-nav flex-row order-1 order-lg-2 flex-1 flex-lg-0 justify-content-end align-items-center">

                    {children}

                </ul>

            </div>
        </>
    );

}

export { NavBar };