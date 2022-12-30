import React from 'react';

function ItemMenu(props) {
    return (
        <div >

            <ul className="nav nav-sidebar" data-nav-type="accordion" id="navigationMenu">

                <li className="nav-item" >

                    <a href="#" className="nav-link">
                        <i className={props.icono}></i>
                        <span>{props.name}</span>
                    </a>
                    
                    {props.children}

                </li>


            </ul>
        </div>

    );
}

export { ItemMenu };