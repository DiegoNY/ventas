import React from 'react';
import './index.css'

function SubMenuItem(props) {
    
    return (
        <ul className="nav-item  sub-menu-item-inactive" data-submenu-title="Layouts" >
            {props.children}
        </ul>
    );

}

export { SubMenuItem };
