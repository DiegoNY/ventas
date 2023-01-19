import React from 'react';


function ProductoSeleccionado(props) {



    return (
        <>
            {!props.total && !props.input &&

                <div div className="table-cell ...">
                    <textarea
                        rows={props.rows || '1'}
                        cols={props.cols || '5'}
                        defaultValue={props.defaultValue}
                        onChange={props.onChange}
                    >
                    </textarea>
                </div>
            }

            {props.input && !props.total &&

                <div className="table-cell ...">
                    <input
                        className='
                            form-control-sm 
                            w-46
                        '
                        value={props.value}
                        type={props.type}
                        onChange={props.onChange}
                    />

                </div>

            }

            {props.total &&
                <div className="table-cell ...">{props.total}</div>
            }

        </>
    )

}


export { ProductoSeleccionado }