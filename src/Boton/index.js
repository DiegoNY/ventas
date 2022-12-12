import React from 'react'


function Button(props) {

    return (
        <button 
        type='button' 
        className='
        bg-indigo-500 
        h-10 
        rounded-md
        text-white 
        cursor-pointer
        px-3
        text-sm
        shadow-md
        w-px-15
        '
        onClick={props.onClick}
        >

            {props.text}

        </button>
    );
}

export { Button };