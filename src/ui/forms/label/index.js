import React from 'react';

function Label(props) {

    return (
        <>
            <tr>
                <td className='font-sans'>

                    <span>
                        <i class={props.icon}></i>
                    </span>

                    {props.text}

                </td>
                <td className='font-mono'>

                    {props.type &&
                        <input
                            placeholder={props.text}
                            className='
                     input-form
                     form-control 
                     form-control-sm
                     shadow-sm p-2  
                     rounded
                 '
                            value={props.value}
                            type={props.type}

                            onChange={props.onChange}
                        />
                    }
                    {!props.type && !props.select &&

                        <input
                            placeholder={props.text}
                            className='
                            input-form
                            form-control 
                            form-control-sm
                            shadow-sm p-2  
                            rounded
                        '
                            value={props.value}

                            onChange={props.onChange}
                        />

                    }

                    {props.select &&

                        <select
                            role={'button'}
                            className='
                                input-form
                                form-control 
                                px-2
                                form-control-sm
                                shadow-sm p-0  
                                rounded
                            '
                            value={props.value}
                            onChange={props.onChange}
                        >
                            {props.children}
                        </select>

                    }

                </td>

            </tr>
        </>
    );

}


export { Label }