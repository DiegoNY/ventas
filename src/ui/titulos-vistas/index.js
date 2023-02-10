import React from 'react';


function Titulo(props) {

    return (
        <>

            <div
                className={props?.className?.container || 'flex flex-col w-full ml-4 my-2'}
            >
                <h1 className={props?.className?.title || `
                            mr-auto
                            text-2xl 
                            sm:text-2xl 
                            font-extrabold 
                            text-slate-900 
                            tracking-tight 
                        `}
                >{props.title}</h1>
                <p className={props?.className?.navegacion || `
                            text-sm 
                            font-normal 
                            text-slate-500
                        `}
                >{props.navegacion} </p>
            </div>
        </>
    )

}

export { Titulo }