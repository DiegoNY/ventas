import React from 'react';
import { Link } from 'react-router-dom';

function ItemMenu(props) {

    return (
        <div >

            <ul
                className="nav nav-sidebar" data-nav-type="accordion" id="navigationMenu"
               
            >

                <li className="nav-item" >
                    {props.link &&
                        <Link
                            className="nav-link"
                            to={`/${props.link}`}
                        >

                            <i className={props.icono}></i>
                            <span>{props.name}</span>

                        </Link> || <Link
                            className={`nav-link `}
                            onClick={props.onClick}
                            
                        >

                            <i className={props.icono}></i>
                            <span>{props.name}</span>

                        </Link>
                    }


                    {props.children}

                </li>


            </ul>
        </div>

    );
}

export { ItemMenu };