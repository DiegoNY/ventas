import React from 'react';

function LabelGroup(props) {

    return (

        <div className='flex flex-row gap-2 max-w-xs'>

            <label className='text-sm font-semibold font-sans w-1/2 mb-0 p-2'>{props.text}</label>

            <input className='w-1/2 h-10' value={props.value} onChange={props.onChange}/>

        </div>

    );

}


export { LabelGroup };