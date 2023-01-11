import React from 'react';


function InputForm(props) {

    return (
        <>
            {props.select &&
                <div >
                    <label className='block text-sm font-medium text-gray-700'>{props.name}</label>
                    <select
                        placeholder={props.placeholder}
                        className='
                            input-form
                            form-control 
                            form-control-sm
                            shadow-sm   
                            rounded
                            p-0
                            px-2
                            font-mono
                        '
                        value={props.value}
                        onChange={props.onChange}
                    >
                        {props.children}
                    </select>
                </div>

            }
            {!props.select &&

                <div >
                    <label className='font-sans'>{props.name}</label>
                    <input
                        placeholder={props.placeholder}
                        className='
                            input-form
                            form-control 
                            form-control-sm
                            shadow-sm   
                            rounded
                            p-0
                            px-2
                            font-mono
                        '
                        type={props.type}
                        onChange={props.onChange}
                    />
                </div>

            }

        </>
    )
}

export { InputForm }