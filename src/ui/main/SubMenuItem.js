import React  from 'react';
import './index.css'

function SubMenuItem(props) {


    return (
        <ul className="nav nav-group-sub sub-menu-item-inactive text-blue-200 " id='' data-submenu-title="Layouts" >
            {props.children}
        </ul>
    );

}

export { SubMenuItem };
