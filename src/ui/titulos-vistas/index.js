import React from 'react';


function Titulo(props) {

    return (
        <>
            <div
                className='
                    card-body 
                    mx-2 
                    flex 
                    justify-between
                    p-3
                '
            >
                <h3
                    className='
                           
                           inline-block 
                           text-2xl 
                           sm:text-2xl 
                           font-black 
                           text-slate-900 
                           tracking-tight 
                           
                        '
                >

                    <span className='font-sans' >{props.title}</span>
                    /
                    <span
                        className='
                            text-base 
                            font-black 
                            text-sky-400
                            leading-6
                        '
                    > {props.navegacion}
                    </span>
                    <i className={`${props.icono} text-xs ml-2 `}>{props.iconoEmoji}</i>

                </h3>



            </div>
        </>
    )

}

export { Titulo }